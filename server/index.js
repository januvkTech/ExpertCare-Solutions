const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const app = express();
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);

app.get("/", (req, res) => {
  res.send("Test");
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log(`DB connection successful`);
  })
  .catch((err) => {
    console.log(err);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server started on portt ${process.env.PORT}`);
});

const io = socket(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      // console.log(data)
      socket
        .to(sendUserSocket)
        .emit("msg-recieve", { msg: data.msg, from: data.from, to: data.to });
    }
  });
});
