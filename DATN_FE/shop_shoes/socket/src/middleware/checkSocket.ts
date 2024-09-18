import jwt, { Secret } from "jsonwebtoken";

export const authSocket = (socket: Socket.ExternalSocket, next: any) => {
  try {
    const token = socket.handshake.auth.token;
    console.log(token);
    if (token) {
      jwt.verify(
        token,
        process.env.AC_TOKEN_KEY as Secret,
        async (err: any, decoded: any) => {
          if (err) {
            return next(new Error("Không có quyền truy cập"));
          } else {
            socket.userId = decoded.userId;
            next();
          }
        }
      );
    } else {
      return next(new Error("Không có quyền truy cập"));
    }
  } catch (error) {
    return next(new Error("Không có quyền truy cập"));
  }
};
