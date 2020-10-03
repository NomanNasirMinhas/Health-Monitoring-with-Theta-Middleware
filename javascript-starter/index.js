const { adminLogin, getAllSeeds, getSeed, getAllHash,getLastTransaction, sendPublicTransaction } = require('./thetamiddleware/middleware');

async function testing() {
  var result = await adminLogin("Admin_ID", "Admin_Password")
  console.log(result)
    // testSeed =
    //   "MBNDML9YVMXWKOMQZKYNJZQQRIQUQYLSNNDLSHCEAKKDJYHBPEWXBNXNXWOGQTHYUCBPPECYHVQFTZFOQ";
    // testAddress =
    //   "WIHQJPVOYYGNT9ELDNVUGVEYGYWOBKES9ASIGIZEHIAOZUWBOBFSWPQMYSNMWKRUJQLOTLRKVXRZKKKPC";
    //   var count=0;
    //   var readings=null;
    //   // var msg = await getLastTransaction(testAddress)
    //   // console.log(msg)
    //   while(true){
    //     count++;
    //     readings={
    //       HR: getHeartRate(50,70),
    //       BPM: getBPM(70,90),
    //       BP:{
    //         systolic: getBPsys(60,90),
    //         diastolic: getBPdias(100,130)
    //       }
    //     }
    //     readings=JSON.stringify(readings);
    //     console.log(readings)
    //     var result = await sendPublicTransaction(testSeed, testAddress, readings);
    // console.log(count);
    //   }

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

  testing()