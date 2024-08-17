import cron from "node-cron";
import { distributeVouchers } from "../service/VoucherService"; // Đảm bảo đường dẫn đúng
import { Users } from "../models/Users";
import { OrderDetails } from "../models/OrderDetails";
import { OrderItems } from "../models/OrderItems";
import { updateProductPrices } from "./utils";

// Đặt lịch cron job (ví dụ: chạy mỗi ngày lúc 1 giờ sáng)
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
