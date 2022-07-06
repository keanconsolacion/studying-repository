const path = require("path");
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const Filter = require("bad-words");
require("dotenv").config({ path: "../.env" });
const { generateMessage, generateLocationMessage } = require("./utils/messages");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./utils/users");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, "../public");
app.use(express.static(publicDirectory));

const io = socketIO(server);

// socket.emit -> to current connection
// socket.broadcast.emit -> to all other connections
// io.emit -> to all connections
// io.to(roomArg).emit -> to all connections to a specific 'room'
// socket.on('disconnect') -> listen for disconnections

io.on("connection", (socket) => {
  socket.on("join", ({ username, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome"));
    socket.broadcast.to(user.room).emit("message", generateMessage(`${user.username} has joined the room.`));

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("message", (message, callback) => {
    // Check for profanities and do not emit if there are any
    if (new Filter().isProfane(message)) callback("Profanities are not allowed.");

    const user = getUser(socket.id);
    io.to(user.room).emit("message", generateMessage(user.username, message));

    callback();
  });

  socket.on("locationMessage", (coords, callback) => {
    const { longitude, latitude } = coords;
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(user.username, `https://google.com/maps/@${longitude},${latitude}`)
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", generateMessage(`${user.username} has left`));
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(port, () => console.log(`Server started at port ${port}`));
