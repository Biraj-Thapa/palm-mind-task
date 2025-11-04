import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/connection.js";
import userRoutes from "./routes/user.route.js";
import messageRoutes from "./routes/message.route.js"

dotenv.config();

dbConnect();

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());


app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
