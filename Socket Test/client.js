const io = require('socket.io-client');
const socket = io.connect('http://172.20.10.3:7000/');
const fetch = require('node-fetch')
async function main() {
    // call sample API
    // const socket = io();
    await fetch('https://thetamiddleware.herokuapp.com/getMAM/MBNDML9YVMXWKOMQZKYNJZQQRIQUQYLSNNDLSHCEAKKDJYHBPEWXBNXNXWOGQTHYUCBPPECYHVQFTZFOQ&NTWSWV9CBWVKZXKLWSOHFLCJTDWIAMVSYRD9DFDXWJWFBVPWYUYDJQDOOLEWLPOAPHR9CHQKTMEOYRKDC')
    socket.on("connect", () => console.log("hello", `Hi there! I am User`));

    socket.on("vitals", seconds => console.log("MAM = ", seconds));

    socket.on("online", online => console.log("Online = ", online));

    socket.on("welcome", welcomeMessage => console.log("Welcome = ", welcomeMessage));
}

main();