import "dotenv/config";
import express from "express";
import http from "http";
import { Socket as IOSocket, Server } from "socket.io";
import { redis } from "./config/ConnectRedis";
import { authSocket } from "./middleware/checkSocket";
import { ROLE_TYPES } from "./constants";

declare global {
  namespace Socket {
    interface ExternalSocket extends IOSocket {
      userId: string;
    }
  }
}

export const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3001", "http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

io.use(authSocket as any);

io.on("connection", async (socket) => {
  const userId = (socket as Socket.ExternalSocket).userId;
  const roles = (await redis.get(`roles-${userId}`)) as keyof typeof ROLE_TYPES;

  const lstonlineUsersInRedis = (await redis.get("lstOnlineUsers")) || "";
  const lstOnlineUsers = lstonlineUsersInRedis
    ? JSON.parse(lstonlineUsersInRedis)
    : {};
  console.log("_______",userId, roles);
  lstOnlineUsers[userId] = {
    roles,
    userId,
    online: true,
    socketId: socket.id,

    recentTime: new Date().getTime(),
  };


  await redis.set("lstOnlineUsers", JSON.stringify(lstOnlineUsers));

  io.emit("changelstOnlineUsers", Object.values(lstOnlineUsers));

  socket.on("newConversations", async (data: any) => {
    const { receiverId } = data;
    const lstonlineUsersInRedis = (await redis.get("lstOnlineUsers")) || "";
    const lstOnlineUsers = lstonlineUsersInRedis
      ? JSON.parse(lstonlineUsersInRedis)
      : {};
    const receiverOnline: any = Object.values(lstOnlineUsers).find((onliner: any) => onliner?.userId === receiverId);
    // Kiểm tra TH người nhận online gửi socket messages
    if (receiverOnline?.online) {
      io.to(receiverOnline.socketId).emit("newConversations", {})
    }
  });

  socket.on("newMessages", async (data: any) => {
    const { receiverId, messages } = data;
    const lstonlineUsersInRedis = (await redis.get("lstOnlineUsers")) || "";
    const lstOnlineUsers = lstonlineUsersInRedis
      ? JSON.parse(lstonlineUsersInRedis)
      : {};
    const receiverOnline: any = Object.values(lstOnlineUsers).find((onliner: any) => onliner?.userId === receiverId);
    // Kiểm tra TH người nhận online gửi socket messages
    if (receiverOnline?.online) {
      io.to(receiverOnline.socketId).emit("newMessages", messages)
    }
  })

  socket.on("disconnect", async () => {
    const lstonlineUsersInRedis = (await redis.get("lstOnlineUsers")) || "";
    const lstOnlineUsers = lstonlineUsersInRedis
      ? JSON.parse(lstonlineUsersInRedis)
      : {};

    lstOnlineUsers[userId] = {
      roles,
      userId,
      online: false,
      socketId: null,
      recentTime: new Date().getTime(),
    };
    await redis.set("lstOnlineUsers", JSON.stringify(lstOnlineUsers));
    io.emit("changelstOnlineUsers", Object.values(lstOnlineUsers));
  });
});

redis.initial();

server.listen(process.env.SERVER_PORT, () =>
  console.log("Socket is running on port:: " + process.env.SERVER_PORT)
);
