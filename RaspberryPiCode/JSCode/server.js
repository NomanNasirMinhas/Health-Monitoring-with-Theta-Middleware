const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const SERVER_PORT = 7000;

let nextVisitorNumber = 1;
let onlineClients = new Set();

function timestamp() {
    var today = new Date();
    var date =
      today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time + "\n" + date;
    //console.log("Current time is " + dateTime);
    return dateTime;
  }

async function readData(){
  const fetch = require("node-fetch");
  const sensor = require('ds18b20-raspi');
  
  var tempF = sensor.readSimpleF();
  var max30100 = await fetch('http://localhost:5000/');
  max30100 = await max30100.json();
  //console.log(`Temp = ${tempF}-F, Heart Rate = ${max30100.HR}, SPo2 = ${max30100.SPo2}`);
  var dataObj = {
      TimeStamp:timestamp(),
      Temp: tempF,
      HR: max30100.HR,
      SpO2: max30100.SPo2
  }
  return JSON.stringify(dataObj)
  }

function onNewWebsocketConnection(socket) {

    console.info(`Socket ${socket.id} has connected.`);
    onlineClients.add(socket.id);

    socket.on("disconnect", () => {
        onlineClients.delete(socket.id);
        console.info(`Socket ${socket.id} has disconnected.`);
    });

    // echoes on the terminal every "hello" message this socket sends
    socket.on("hello", helloMsg => console.info(`Socket ${socket.id} says: "${helloMsg}"`));

    // will send a message only to this socket (different than using `io.emit()`, which would broadcast it)
    socket.emit("welcome", `Welcome! You are visitor number ${nextVisitorNumber++}`);
}

function startServer() {
    // create a new express app
    const app = express();
app.use(cors());
app.use(express.json());
    // create http server and wrap the express app
    const server = http.createServer(app);
    // bind socket.io to that server
    const io = socketio(server);

    io.on("connection", onNewWebsocketConnection);

    // important! must listen from `server`, not `app`, otherwise socket.io won't function correctly
    server.listen(SERVER_PORT, "0.0.0.0", () => console.info(`Listening on port ${SERVER_PORT}.`));
    console.log("Server Address ",server.address())
    // will send one message per second to all its clients
    let secondsSinceServerStarted = 0;
    setInterval(async () => {

        io.emit("vitals", await readData());
        io.emit("online", onlineClients.size);
    }, 3000);
}

startServer();