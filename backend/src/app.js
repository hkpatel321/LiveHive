import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { error } from "node:console";
import userRoutes from "./routes/users.routes.js"
import {connectToSocket} from "./controllers/socket.manager.js"

const app = express();
const port = 8000;
const server = createServer(app);
const io = connectToSocket(server);
mongoose.connect("mongodb+srv://phet30440:a25hN6GOWi8DY9qt@livehive.0hnkm.mongodb.net/?retryWrites=true&w=majority&appName=LiveHive").then(()=>console.log("DB connected")).catch((err)=>console.log(err));

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
