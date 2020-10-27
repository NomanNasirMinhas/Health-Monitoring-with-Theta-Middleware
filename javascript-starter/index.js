const { adminLogin, getAllSeeds, publishMAMmsg, getSeed, getAllHash,getLastTransaction, sendPublicTransaction } = require('./thetamiddleware/middleware');
require('dotenv').config();

async function sendData() {
    testSeed =process.env.testSeed;
    testAddress =process.env.testAddress;
    console.log(testSeed)
    console.log(testAddress)
      var count=0;
      var readings=null;
      // var msg = await getLastTransaction(testAddress)
      // console.log(msg)
      while(true){
        count++;
        readings={
          TimeStamp: timestamp(),
          HR: getHeartRate(50,70),
          Temp: getBPM(70,90),
          BP:{
            systolic: getBPsys(60,90),
            diastolic: getBPdias(100,130)
          }
        }
        readings=JSON.stringify(readings);
        console.log(readings)
        var result = await sendPublicTransaction(testSeed, testAddress, readings);
        console.log(result)
    console.log(count);
      }

  }

  async function publishMam(){
    testSeed =process.env.testSeed;
    testAddress =process.env.testAddress;
    await publishMAMmsg(dummyMamMsg, testSeed, testAddress)
  }

  function dummyMamMsg(){
    return "Hello from IoTA"
  }

  function getHeartRate(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function getBPM(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function getBPsys(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function getBPdias(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

  function timestamp() {
    var today = new Date();
    var date =
      today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time + "/" + date;
    // console.log("Current time is " + dateTime);
    return dateTime;
  }

  // sendData()
  publishMam()