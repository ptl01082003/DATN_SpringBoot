import { Op } from "sequelize";
import { Vouchers } from "../models/Vouchers";
import { Users } from "../models/Users";
import { OrderDetails } from "../models/OrderDetails";
import { Voucher_RULE, Vouchers_STATUS } from "../models/Vouchers";
import { UserVouchers } from "../models/UserVouchers";
import { startOfDay, endOfDay } from "date-fns";

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
      console.log(
        `Voucher ${voucherCode} không tìm thấy hoặc không hoạt động.`
      );
      return false;
    }

    console.log(`Tìm thấy voucher: ${JSON.stringify(voucher)}`);

    const user = await Users.findByPk(userId);

    if (!user) {
      console.log(`Người dùng với ID ${userId} không tìm thấy.`);
      return false;
    }

    console.log(`Tìm thấy người dùng: ${JSON.stringify(user)}`);

    const orderCount = await OrderDetails.count({
      where: {
        userId: userId,
        createdAt: {
          [Op.gte]: startOfDay(now),
        },
      },
    });

    console.log(`Số lượng đơn hàng của người dùng ${userId}: ${orderCount}`);

    switch (voucher.ruleType) {
      case Voucher_RULE.MIN_ORDER_VALUE:
        if (orderValue < (voucher.minOrderValue || 0)) {
          console.log(
            `Giá trị đơn hàng ${orderValue} nhỏ hơn giá trị tối thiểu ${voucher.minOrderValue}`
          );
          return false;
        }
        break;
      case Voucher_RULE.NEW_ACCOUNT:
        const accountCreatedWithin30Days =
          now.getTime() - new Date(user.createdAt).getTime() <=
          30 * 24 * 60 * 60 * 1000;

        if (!accountCreatedWithin30Days) {
          console.log(
            `Tài khoản người dùng với ID ${user.userId} không đủ điều kiện cho voucher ${voucher.code} vì không phải tài khoản mới.`
          );
          return false;
        }
        break;
      case Voucher_RULE.ORDER_COUNT:
        if (
          (voucher.minOrderCount !== undefined &&
            orderCount < voucher.minOrderCount) ||
          (voucher.maxOrderCount !== undefined &&
            orderCount > voucher.maxOrderCount)
        ) {
          console.log(
            `Số lượng đơn hàng ${orderCount} không nằm trong phạm vi (${voucher.minOrderCount} - ${voucher.maxOrderCount})`
          );
          return false;
        }
        break;
      default:
        console.log(`Loại quy tắc voucher không xác định: ${voucher.ruleType}`);
        return false;
    }

    console.log(`Voucher ${voucherCode} đủ điều kiện cho người dùng ${userId}`);
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

    console.log(`Các voucher có sẵn để phân phối: ${JSON.stringify(vouchers)}`);

    if (!vouchers.length) {
      console.log("Không có voucher nào sẵn có để phân phối.");
      return;
    }

    const users = await Users.findAll();

    console.log(`Tổng số người dùng được tìm thấy: ${users.length}`);

    for (const user of users) {
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
        continue;
      }

      for (const order of orders) {
        const orderValue = order.amount;

        for (const voucher of vouchers) {
          const isEligible = await checkVoucherEligibility(
            voucher.code,
            user.userId,
            orderValue
          );

          console.log(
            `Kiểm tra điều kiện cho voucher ${voucher.code} và người dùng ${user.userId}: ${isEligible}`
          );

          if (isEligible) {
            const existingVoucher = await UserVouchers.findOne({
              where: {
                userId: user.userId,
                voucherId: voucher.voucherId,
              },
            });

            if (existingVoucher) {
              console.log(
                `Voucher ${voucher.code} đã được phân phối cho người dùng ${user.userId} rồi.`
              );
              continue;
            }

            // Phân phối voucher cho người dùng
            try {
              if (voucher.quantity > 0) {
                // Kiểm tra số lượng voucher còn lại
                await UserVouchers.create({
                  userId: user.userId,
                  voucherId: voucher.voucherId,
                  receivedAt: new Date(),
                });

                // Cập nhật số lượng voucher sau khi phân phối
                voucher.quantity -= 1;
                await voucher.save();

                console.log(
                  `Voucher ${voucher.code} đã được phân phối cho người dùng ${user.userId}. Số lượng còn lại: ${voucher.quantity}`
                );
              } else {
                console.log(`Voucher ${voucher.code} đã hết số lượng.`);
              }
            } catch (error) {
              console.error(
                `Lỗi khi phân phối voucher ${voucher.code} cho người dùng ${user.userId}:`,
                error
              );
            }
          }
        }
      }
    }
  } catch (error) {
    console.error("Lỗi khi phân phối voucher:", error);
  }
}
