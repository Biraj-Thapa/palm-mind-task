import Message from "../models/message.model.js";

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("user", "name email").sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new message
export const createMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const message = await Message.create({
      user: req.user._id,
      text,
    });
    await message.populate("user", "name email");
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
