import moment from "moment";
import { Products } from "./../models/Products";
import { Promotions, PROMOTIONS_STATUS } from "./../models/Promotions";
import crypto from "crypto-js";

const applyPromotionToProduct = async (product: any, promotion: any) => {
  const startDay = moment(promotion.startDay);
  const endDay = moment(promotion.endDay);
  const currentTime = moment();

  try {
    if (currentTime.isBetween(startDay, endDay, null, "[]")) {
      await promotion.update({ status: PROMOTIONS_STATUS.ACTIVE });
      const originalPrice = product.price;
      const discountedPrice = originalPrice - promotion.discountPrice;

      console.log(`Sản phẩm: ${product.name}`);
      console.log(`Giá gốc: ${originalPrice}`);
      console.log(`Giá sau khi giảm: ${discountedPrice}`);

      const [affectedRows] = await Products.update(
        { priceDiscount: discountedPrice },
        { where: { productId: product.productId } }
      );

      if (affectedRows > 0) {
        console.log(`Giá sản phẩm ID ${product.productId} đã được cập nhật.`);
      } else {
        console.log(
          `Không có bản ghi nào được cập nhật cho sản phẩm ID ${product.productId}.`
        );
      }
    } else if (currentTime.isBefore(startDay)) {
      await promotion.update({ status: PROMOTIONS_STATUS.PRE_START });
      console.log(`Khuyến mãi ID ${promotion.promotionId} chưa bắt đầu.`);
    } else if (currentTime.isAfter(endDay)) {
      await promotion.update({ status: PROMOTIONS_STATUS.EXPIRED });

      const originalPrice = product.price;

      await Products.update(
        { priceDiscount: originalPrice },
        { where: { productId: product.productId } }
      );

      console.log(`Khuyến mãi ID ${promotion.promotionId} đã hết hạn.`);
    }
  } catch (error) {
    console.error("Lỗi khi áp dụng khuyến mãi:", error);
  }
};

export const updateProductPrices = async () => {
  try {
    console.log(
      "Bắt đầu cập nhật giá sản phẩm:",
      moment().format("YYYY-MM-DD HH:mm:ss")
    );
    const products = await Products.findAll();
    console.log(`Tổng số sản phẩm: ${products.length}`);

    for (const product of products) {
      const promotions = await Promotions.findAll({
        where: { productId: product.productId },
      });
      console.log(
        `Sản phẩm ID ${product.productId} có ${promotions.length} khuyến mãi`
      );

      for (const promotion of promotions) {
        await applyPromotionToProduct(product, promotion);
      }
    }

    console.log("Cập nhật giá sản phẩm hoàn tất.");
  } catch (error) {
    console.error("Lỗi khi cập nhật giá sản phẩm:", error);
  }
};
export function generateUniqueUserId() {
  const min = 1000000000;
  const randomNumber = parseInt(
    crypto.lib.WordArray.random(4).toString(crypto.enc.Hex),
    16
  );
  const userId = min + (randomNumber % min);
  return userId;
}

export function genaratorProductsId() {
  const min = 100000;
  const randomNumber = parseInt(
    crypto.lib.WordArray.random(4).toString(crypto.enc.Hex),
    16
  );
  const productsId = min + (randomNumber % min);
  return productsId;
}

export function genaratorImagesId() {
  const min = 100000000000;
  const randomNumber = parseInt(
    crypto.lib.WordArray.random(4).toString(crypto.enc.Hex),
    16
  );
  const productsId = min + (randomNumber % min);
  return productsId;
}

export function sortObject(obj: any) {
  const sorted: any = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}
