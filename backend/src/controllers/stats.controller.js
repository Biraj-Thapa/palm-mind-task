import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getOnlineCount } from "../socket/onlineUsers.js";

export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalChats = await Message.countDocuments();

    const onlineCount = typeof getOnlineCount === "function" ? getOnlineCount() : 0;

    res.json({ totalUsers, totalChats, onlineCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
