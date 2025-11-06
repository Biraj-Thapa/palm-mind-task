import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/connection.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js";
import statsRoutes from "./routes/stats.route.js"
import http from "http";
import { initSocket } from "./socket/socket.js";
import cors from "cors"

dotenv.config();

dbConnect();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
}));

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

const server = http.createServer(app);

initSocket(server);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
