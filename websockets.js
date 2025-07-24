const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
app.use(express.static("public"));
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A user is connected", socket.id);
  // setInterval(() => {
  //   socket.emit("message", "message from server-" + socket.id + new Date());
  // }, 5000);

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
  });

  socket.on("message", (data) => {
    socket.broadcast.emit("broadcast", data);
  });
});

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "public", "index.html");
  res.sendFile(filePath);
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
