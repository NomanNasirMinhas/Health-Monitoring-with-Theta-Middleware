const {publishMAMmsg, sendPublicTransaction } = require('./thetamiddleware/middleware');
require('dotenv').config();


async function readData(){
const fetch = require("node-fetch");
const sensor = require('ds18b20-raspi');

var tempF = sensor.readSimpleF();
var max30100 = await fetch('http://localhost:5000/');
max30100 = await max30100.json();
console.log(`Temp = ${tempF}-F, Heart Rate = ${max30100.HR}, SPo2 = ${max30100.SPo2}`);
var dataObj = {
    Temp: tempF,
    HR: max30100.HR,
    SpO2: max30100.SPo2
}
return JSON.stringify(dataObj)
}

async function publishMam(){
    testSeed =process.env.testSeed;
    testAddress =process.env.testAddress;
    await publishMAMmsg(readData, testSeed, testAddress)
  }

  MONGO_URI=mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/thetamw1?retryWrites=true&w=majority
  IOTA_NODE=https://nodes.iota.cafe:443
  PORT=5000
  testSeed =MBNDML9YVMXWKOMQZKYNJZQQRIQUQYLSNNDLSHCEAKKDJYHBPEWXBNXNXWOGQTHYUCBPPECYHVQFTZFOQ
  testAddress =NTWSWV9CBWVKZXKLWSOHFLCJTDWIAMVSYRD9DFDXWJWFBVPWYUYDJQDOOLEWLPOAPHR9CHQKTMEOYRKDC

publishMam()