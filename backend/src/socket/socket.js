import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { addConnection, removeConnection, getOnlineCount } from "./onlineUsers.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Authentication error: token required"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return next(new Error("Authentication error: user not found"));

      socket.user = user;
      return next();
    } catch (err) {
      console.error("Socket auth error:", err.message);
      return next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    const user = socket.user;
    if (!user) {
      console.warn("Connected socket has no user, disconnecting", socket.id);
      socket.disconnect(true);
      return;
    }

    console.log("User connected:", user._id, socket.id);

   
    addConnection(socket.id, user._id);


    io.emit("userJoined", {
      user: { _id: user._id, name: user.name, email: user.email },
      onlineCount: getOnlineCount(),
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { text } = data || {};
        if (!text || typeof text !== "string" || text.trim().length === 0) return;

        const newMessage = await Message.create({
          user: user._id,
          text: text.trim(),
        });

        const populatedMessage = await newMessage.populate("user", "name email");

        io.emit("receiveMessage", populatedMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", user._id, socket.id);
      removeConnection(socket.id);

      io.emit("userLeft", {
        userId: user._id,
        onlineCount: getOnlineCount(),
      });
    });
  });
};
