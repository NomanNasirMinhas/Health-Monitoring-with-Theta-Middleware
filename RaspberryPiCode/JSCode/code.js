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

async function sendData(){
testSeed =process.env.testSeed;
testAddress =process.env.testAddress;

while(true)
{ 
	var readings = await readData();
	//readings=JSON.stringify(readings);
        await fetch("https://thetamiddleware.herokuapp.com/sendTx", {
          method: "POST",
          body: JSON.stringify({
              seed: testSeed,
              address: testAddress,
              txType:"vitals",
              Data: readings
          }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
 }
}


async function publishMam(){
    testSeed =process.env.testSeed;
    testAddress =process.env.testAddress;
	
    await publishMAMmsg(readData, testSeed, testAddress)
  }
  

sendData()