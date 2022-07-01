const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Filter = require("bad-words");
require("dotenv").config({ path: "../.env" });

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");

app.use(express.static(publicDirectory));

// Note: event names are case-sensitive.
io.on("connection", (socket) => {
  socket.emit("message", "Welcome to the socketverse"); // Emits to the current connection

  socket.broadcast.emit("message", "A new user has joined"); // Emits to every connection except for current

  socket.on("message", (message, callback) => {
    if (new Filter().isProfane(message))
       callback("Profanities are not allowed."); // Check for profanities and do not emit if there are any

    io.emit("message", message); // Emits to all connections including current
    callback()
  });

  socket.on("sendLocation", (coords, callback) => {
    const { longitude, latitude } = coords;
    socket.broadcast.emit(
      "sendLocation",
      `https://google.com/maps/@${longitude},${latitude}`
    );
    callback()
  });

  // Note: disconnect event is built-in on socket.io
  socket.on("disconnect", () => {
    io.emit("message", "A user has left");
  });
});

server.listen(port, () => console.log(`Server started at port ${port}`));
