const {publishMAMmsg, sendPublicTransaction } = require('./thetamiddleware/middleware');
require('dotenv').config();
const readline = require('readline');
const testSeed =process.env.testSeed;
const testAddress =process.env.testAddress;

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

async function sendData(){
  //console.log("New Transaction is being sent")
 
	var readings = await readData();
	//readings=JSON.stringify(readings);
    if(JSON.parse(readings).SpO2 <60){
        console.log("Vitals Readings... Please Wait While Sensors are getting Stable......")
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
})
    console.log("New Transaction Added")
}
}


async function publishMam(){
    await publishMAMmsg(testSeed, testAddress)
  }
  
var txVar = setInterval(sendData, 20000);


function myStopFunction() {
  console.log("Stopping Program")
  clearInterval(txVar);
}

async function setLoggedIn(){
  console.log("Please wait while your status is being Logged in IOTA....")
  
  var status = {
    TimeStamp: timestamp(),
    LogType: 1,
    LogDetails: "Device Online"
    }
  await fetch("https://thetamiddleware.herokuapp.com/sendTx", {
          method: "POST",
          body: JSON.stringify({
              seed: testSeed,
              address: testAddress,
              txType:"deviceLog",
              Data: JSON.stringify(status)
          }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
console.log("Your Log-In Activity has been Logged in IOTA....")
}

async function setLoggedOut(){
  console.log("Please wait while your status is being Logged in IOTA....")
  
  var status = {
    TimeStamp: timestamp(),
    LogType: 0,
    LogDetails: "Device Offline"
    }
  await fetch("https://thetamiddleware.herokuapp.com/sendTx", {
          method: "POST",
          body: JSON.stringify({
              seed: testSeed,
              address: testAddress,
              txType:"deviceLog",
              Data: JSON.stringify(status)
          }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
console.log("Your Log-Out Activity has been Logged in IOTA....")
}

async function logDeviceDetails(){
    var info = await fetch(`https://thetamiddleware.herokuapp.com/getAddressInfo/${testSeed}&${testAddress}`)
    info = await info.json();
    if(info == false){
      console.log("Log In Error")
      }
    else{
      console.log("Welcome User..... Your Details are as follows")
      console.log("Name: ", info.Profile.name.toString())
      console.log("Gender: ", info.Profile.gender.toString())
      console.log("Admitted On: ", info.Profile.date.toString())
      }
}

async function menu(txVar){
  try{
    //txVar;
    await logDeviceDetails();
    await setLoggedIn();
    await publishMAMmsg(testSeed, testAddress);
  }catch(e)
  {
    console.log(e)
    }
  
  }

process.on('SIGINT', async function() {
  myStopFunction();
  await setLoggedOut();
  console.log('Exiting the Program');
  process.exit()
});
//myStopFunction()
menu(txVar)
