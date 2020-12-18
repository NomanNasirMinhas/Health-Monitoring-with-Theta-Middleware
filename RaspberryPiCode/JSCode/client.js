const io = require('socket.io-client');
const socket = io.connect('https://thetamiddleware.herokuapp.com:29780/');
const fetch = require('node-fetch')
async function main() {
    // call sample API
    // const socket = io();
    await fetch('https://thetamiddleware.herokuapp.com/getMAM/MBNDML9YVMXWKOMQZKYNJZQQRIQUQYLSNNDLSHCEAKKDJYHBPEWXBNXNXWOGQTHYUCBPPECYHVQFTZFOQ&NTWSWV9CBWVKZXKLWSOHFLCJTDWIAMVSYRD9DFDXWJWFBVPWYUYDJQDOOLEWLPOAPHR9CHQKTMEOYRKDC')
    socket.on("connect", () => console.log("hello", `Hi there! I am User`));

    socket.on("mamMsg", seconds => console.log("MAM = ", seconds));

    socket.on("online", online => console.log("Online = ", online));

    socket.on("welcome", welcomeMessage => console.log("Welcome = ", welcomeMessage));
}

main();