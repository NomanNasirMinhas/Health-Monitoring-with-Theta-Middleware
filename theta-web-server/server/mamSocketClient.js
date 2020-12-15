const io = require('socket.io-client');
const socket = io('https://thetamiddleware.herokuapp.com/');

async ()=>{
  await fetch("https://thetamiddleware.herokuapp.com/getMAM/MBNDML9YVMXWKOMQZKYNJZQQRIQUQYLSNNDLSHCEAKKDJYHBPEWXBNXNXWOGQTHYUCBPPECYHVQFTZFOQ&NTWSWV9CBWVKZXKLWSOHFLCJTDWIAMVSYRD9DFDXWJWFBVPWYUYDJQDOOLEWLPOAPHR9CHQKTMEOYRKDC")
}

socket.on("mamMsg", async (arg) => {
    console.log("Hello", JSON.parse(arg));
  });