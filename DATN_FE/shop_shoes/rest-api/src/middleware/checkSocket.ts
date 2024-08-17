// import jwt, { Secret } from "jsonwebtoken";
// import { redis } from "../config/ConnectRedis";
// export const checkSocket = (socket: Socket.ExternalSocket, next: any) => {
//   try {
//     const token = socket.handshake.auth.token;
//     if (token) {
//       jwt.verify(
//         token,
//         process.env.AC_TOKEN_KEY as Secret,
//         async (err: any, decoded: any) => {
//           if (err) {
//             return next(new Error("Không có quyền truy cập"));
//           } else {
//             const tokenInRedis = await redis.get(
//               `accessToken-${decoded.userId}`
//             );
//             if (tokenInRedis === token) {
//               socket.userId = decoded.userId;
//               next();
//             } else {
//               return next(new Error("Không có quyền truy cập"));
//             }
//           }
//         }
//       );
//     } else {
//       return next(new Error("Không có quyền truy cập"));
//     }
//   } catch (error) {
//     return next(new Error("Không có quyền truy cập"));
//   }
// };
