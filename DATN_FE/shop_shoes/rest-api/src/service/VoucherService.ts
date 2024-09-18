import { Op } from "sequelize";
import { Vouchers, Voucher_RULE, Vouchers_STATUS } from "../models/Vouchers";
import { Users } from "../models/Users";
import { OrderDetails } from "../models/OrderDetails";
import { UserVouchers } from "../models/UserVouchers";
import { startOfDay, endOfDay } from "date-fns";
import sequelize from "sequelize";

// Hàm xóa voucher bị trùng
async function removeDuplicateVouchers() {
  try {
    const duplicates = await UserVouchers.findAll({
      attributes: ['userId', 'voucherId'],
      group: ['userId', 'voucherId'],
      having: sequelize.literal('COUNT(*) > 1'),
    });

    console.log(`Số lượng voucher bị trùng: ${duplicates.length}`);

    for (const duplicate of duplicates) {
      const { userId, voucherId } = duplicate;

      const userVoucherRecords = await UserVouchers.findAll({
        where: {
          userId: userId,
          voucherId: voucherId,
        },
        order: [['receivedAt', 'ASC']],
      });

      for (let i = 1; i < userVoucherRecords.length; i++) {
        await userVoucherRecords[i].destroy();
        console.log(`Đã xóa voucher trùng với userId: ${userId}, voucherId: ${voucherId}`);
      }
    }
  } catch (error) {
    console.error("Lỗi khi xóa voucher bị trùng:", error);
  }
}

async function checkVoucherEligibility(
  voucherCode: string,
  userId: number,
  orderValue: number
): Promise<boolean> {
  try {
    const now = new Date();
    const voucher = await Vouchers.findOne({
      where: {
        code: voucherCode,
        status: Vouchers_STATUS.ISACTIVE,
        [Op.and]: [
          { startDay: { [Op.lte]: endOfDay(now) } },
          { endDay: { [Op.gte]: startOfDay(now) } },
        ],
      },
    });

    if (!voucher) {
      console.log(`Voucher ${voucherCode} không tìm thấy hoặc không hoạt động.`);
      return false;
    }

    const user = await Users.findByPk(userId);
    if (!user) {
      console.log(`Người dùng với ID ${userId} không tìm thấy.`);
      return false;
    }

    const orderCount = await OrderDetails.count({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: startOfDay(now),
        },
      },
    });

    // Kiểm tra điều kiện voucher
    switch (voucher.ruleType) {
      case Voucher_RULE.MIN_ORDER_VALUE:
        if (orderValue < (voucher.minOrderValue || 0)) {
          console.log(`Giá trị đơn hàng ${orderValue} nhỏ hơn ${voucher.minOrderValue}`);
          return false;
        }
        break;
      case Voucher_RULE.NEW_ACCOUNT:
        const accountCreatedWithin30Days =
          now.getTime() - new Date(user.createdAt).getTime() <= 30 * 24 * 60 * 60 * 1000;
        if (!accountCreatedWithin30Days) {
          console.log(`Tài khoản ${user.userId} không đủ điều kiện vì không phải tài khoản mới.`);
          return false;
        }
        break;
      case Voucher_RULE.ORDER_COUNT:
        if (
          (voucher.minOrderCount !== undefined && orderCount < voucher.minOrderCount) ||
          (voucher.maxOrderCount !== undefined && orderCount > voucher.maxOrderCount)
        ) {
          console.log(`Số lượng đơn hàng ${orderCount} không nằm trong phạm vi cho phép.`);
          return false;
        }
        break;
      default:
        console.log(`Quy tắc voucher không xác định: ${voucher.ruleType}`);
        return false;
    }

    return true;
  } catch (error) {
    console.error("Lỗi khi kiểm tra điều kiện voucher:", error);
    return false;
  }
}

export async function distributeVouchers() {
  try {
    const now = new Date();
    const vouchers = await Vouchers.findAll({
      where: {
        status: Vouchers_STATUS.ISACTIVE,
        [Op.and]: [
          { startDay: { [Op.lte]: endOfDay(now) } },
          { endDay: { [Op.gte]: startOfDay(now) } },
        ],
      },
    });

    if (!vouchers.length) {
      console.log("Không có voucher nào sẵn để phân phối.");
      return;
    }

    const users = await Users.findAll();
    if (!users.length) {
      console.log("Không tìm thấy người dùng để phân phối voucher.");
      return;
    }

    await Promise.all(
      users.map(async (user) => {
        const orders = await OrderDetails.findAll({
          where: {
            userId: user.userId,
            createdAt: {
              [Op.gte]: startOfDay(now),
            },
          },
        });

        if (orders.length === 0) {
          console.log(`Người dùng ${user.userId} không có đơn hàng mới.`);
          return;
        }

        for (const order of orders) {
          const orderValue = order.amount;

          await Promise.all(
            vouchers.map(async (voucher) => {
              const isEligible = await checkVoucherEligibility(voucher.code, user.userId, orderValue);

              if (isEligible) {
                const existingVoucher = await UserVouchers.findOne({
                  where: {
                    userId: user.userId,
                    voucherId: voucher.voucherId,
                  },
                });

                if (existingVoucher) {
                  console.log(`Voucher ${voucher.code} đã được phân phối cho người dùng ${user.userId} rồi.`);
                  return;
                }

                const voucherReloaded = await Vouchers.findOne({
                  where: { voucherId: voucher.voucherId },
                });

                if (voucherReloaded && voucherReloaded.quantity && voucherReloaded.quantity > 0) {
                  try {
                    await UserVouchers.create({
                      userId: user.userId,
                      voucherId: voucher.voucherId,
                      receivedAt: new Date(),
                    });

                    voucherReloaded.quantity -= 1;
                    await voucherReloaded.save();

                    console.log(`Voucher ${voucher.code} đã được phân phối cho người dùng ${user.userId}. Số lượng còn lại: ${voucherReloaded.quantity}`);
                  } catch (error) {
                    console.error(`Lỗi khi phân phối voucher ${voucher.code} cho người dùng ${user.userId}:`, error);
                  }
                } else {
                  console.log(`Voucher ${voucher.code} đã hết số lượng hoặc không tồn tại.`);
                }
              }
            })
          );
        }
      })
    );

    await removeDuplicateVouchers();
  } catch (error) {
    console.error("Lỗi khi phân phối voucher:", error);
  }
}
