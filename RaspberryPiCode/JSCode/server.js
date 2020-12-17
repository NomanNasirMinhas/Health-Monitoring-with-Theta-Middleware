const express = require("express");
const cors = require("cors");
const app = express();

let port = 5555;
if (port == null || port == "") {
  port = 8000;
}

app.use(cors());
app.use(express.json());

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("Client Connected")
});

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});