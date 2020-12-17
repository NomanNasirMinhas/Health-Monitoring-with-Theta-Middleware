const io = require('socket.io-client');
const socket = io.connect('http://127.0.0.1:7000/');

async function main() {
    // call sample API
    // const socket = io();
    socket.on("connect", () => console.log("hello", `Hi there! I am User`));

    socket.on("seconds", seconds => console.log("Seconds = ", seconds));

    socket.on("online", online => console.log("Online = ", online));

    socket.on("welcome", welcomeMessage => console.log("Welcome = ", welcomeMessage));
}

main();