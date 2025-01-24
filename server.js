const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

// Initialize server objects
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ----------Routes----------
// Home/login
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Client Buzzer
app.get("/buzzer", (req, res) => {
  res.sendFile(__dirname + "/buzzer.html");
});

// Client Game Controller
app.get("/control", (req, res) => {
  res.sendFile(__dirname + "/control.html");
});

app.get("/health", (req, res) => {
  res.status(200).send({ status: "Ok" });
});

// ----------Sockets----------
io.on("connection", (socket) => {
  console.log(`User ${socket.handshake.query?.name} has connected.`);
  socket.on("disconnect", () => {
    console.log(`User ${socket.handshake.query?.name} disconnected.`);
  });
  socket.on("buzz", (data) => {
    console.log(`User ${data.name} buzzed in.`);
    io.emit("freeze", data.name);
  });
  socket.on("reset", () => {
    console.log("Controller has sent unfreeze.");

    io.emit("unfreeze");
  });
});

// Run server
server.listen(process.env.port || 3000, () => {
  console.log(`App is listending on ${process.env.port || 3000}.`);
});
