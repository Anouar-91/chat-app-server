const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
import defaultRouter from "./routes/index";

export function launch({ host, protocol, port }) {

const app = express();
require('dotenv').config();


const socket = require('socket.io');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Chat is running...')
})

mongoose
    .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gbvxg.mongodb.net/chat-app`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.log("Failed to connect MongoDB", error));

    app.use(defaultRouter);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on Port ${process.env.PORT}`);
});

const io = socket(server,{
    cors:{
        origin: ["http://localhost:3001", "http://192.168.1.59:3001", "https://zippy-kataifi-f39844.netlify.app"] ,
        credentials: true,
    }
} )
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
}
