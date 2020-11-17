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
    TimeStamp:timestamp(),
    Temp: tempF,
    HR: max30100.HR,
    SpO2: max30100.SPo2
}
return JSON.stringify(dataObj)
}

function timestamp() {
    var today = new Date();
    var date =
      today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time + "\n" + date;
    console.log("Current time is " + dateTime);
    return dateTime;
  }

async function sendData(){
testSeed =process.env.testSeed;
testAddress =process.env.testAddress;

while(true)
{ 
	var readings = await readData();
	//readings=JSON.stringify(readings);
    if(readings.SpO2 <60){
        console.log("Please Wait While Sensors are getting Stable......")
    }
    else{
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
})}
 }
}


async function publishMam(){
    testSeed =process.env.testSeed;
    testAddress =process.env.testAddress;
	
    await publishMAMmsg(readData, testSeed, testAddress)
  }
  

sendData()