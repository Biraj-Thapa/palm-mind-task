import express from "express"
import dotenv from "dotenv";
import dbConnect from "./db/connection.js";

dotenv.config();

dbConnect();

const port=process.env.PORT || 4000

const app = express()

app.get("/", (req, res) => {
  res.send("Hello World");
});



app.listen(port,()=>{
    console.log(`listening on ${port}`)
})