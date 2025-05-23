import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { error } from "node:console";
import userRoutes from "./routes/users.routes.js"
import {connectToSocket} from "./controllers/socket.manager.js"
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGOURL) {
  console.error("MONGOURL is not defined in the .env file");
  process.exit(1);
}

console.log("Connecting to MongoDB with URL:", process.env.MONGOURL);

mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true})
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const app = express();
const port = 8000;
const server = createServer(app);
const io = connectToSocket(server);

app.use(cors());  

app.use(express.json({limit:"40kb"}));
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users",userRoutes)

app.get("/", (req, res) => {
  res.json("This is good");
});


server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
