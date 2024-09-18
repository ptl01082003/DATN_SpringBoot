// import cron from "node-cron";
// import { distributeVouchers } from "../service/VoucherService"; // Đảm bảo đường dẫn đúng

// import { updateProductPrices } from "./utils";

// cron.schedule("* * * * *", async () => {
//   try {
//     console.log("Starting voucher distribution job...");
//     await distributeVouchers();
//     console.log("Voucher distribution job completed.");
//   } catch (error) {
//     console.error("Error during voucher distribution job:", error);
//   }
// });
// cron.schedule("* * * * *", async () => {
//   console.log(`Cron job bắt đầu lúc: ${new Date().toLocaleString()}`);
//   try {
//     await updateProductPrices();
//   } catch (error) {
//     console.error("Lỗi khi thực hiện cron job:", error);
//   }
// });
//     // Đảm bảo rằng các cron jobs được thực thi khi server khởi động
// console.log("Cron jobs đã được lập lịch.");


import cron from "node-cron";
import { distributeVouchers } from "../service/VoucherService"; 
import { updateProductPrices } from "./utils";

cron.schedule("* * * * *", async () => {
  console.log(`Cron job phân phối voucher bắt đầu lúc: ${new Date().toLocaleString()}`);
  try {
    await distributeVouchers();
    console.log("Cron job phân phối voucher hoàn thành.");
  } catch (error) {
    console.error("Lỗi khi phân phối voucher:", error);
  }
});


cron.schedule("* * * * *", async () => {
  console.log(`Cron job cập nhật giá sản phẩm bắt đầu lúc: ${new Date().toLocaleString()}`);
  try {
    await updateProductPrices();
    console.log("Cron job cập nhật giá sản phẩm hoàn thành.");
  } catch (error) {
    console.error("Lỗi khi cập nhật giá sản phẩm:", error);
  }
});


console.log("Cron jobs đã được lập lịch.");
