const express = require("express");
const path = require("path");
const socketIO = require("socket.io");
const app = express();

app.use("/", express.static(path.join(__dirname, "public/rooms")));
app.use("/grupo1", express.static(path.join(__dirname, "public")));
app.use("/grupo2", express.static(path.join(__dirname, "public")));

const server = app.listen(3000, () => console.log("Server Running"));

// const messages = [];
const messages = { grupo1: [], grupo2: [] };

const io = socketIO(server);

//of vai permitir que eu crie um grupo
const grupo1 = io.of("/grupo1").on("connection", (socket) => {
  console.log("New Connection");
  socket.emit("update_messages", messages.grupo1);

  socket.on("new_message", (data) => {
    messages.grupo1.push(data);

    grupo1.emit("update_messages", messages.grupo1);
  });
});

const grupo2 = io.of("/grupo2").on("connection", (socket) => {
  console.log("New Connection");
  socket.emit("update_messages", messages.grupo2);

  socket.on("new_message", (data) => {
    messages.grupo2.push(data);

    grupo2.emit("update_messages", messages.grupo2);
  });
});

// io.on("connection", (socket) => {
//   console.log("New Connection");
//   socket.emit("update_messages", messages);

//   socket.on("new_message", (data) => {
//     messages.push(data);

//     io.emit("update_messages", messages);
//   });
// });
