//const { asTransactionTrytes } = require('@iota/core/typings/core/src/createPrepareTransfers');

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function timestamp() {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = time + "/" + date;
  console.log("Current time is " + dateTime);
  return dateTime;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getDate() {
  var today = new Date();
  var date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
  console.log("Current Date is " + date);
  return date;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getNode() {
  return "https://nodes.iota.cafe:443";
}

function getSeed(id, pass) {
  //return "QCEVFK9GMHAGLLVWE99EKEWMEGQUPUQXMTTVKEWXV9RVVPANPKNIC9MYZVASV9INYODGBGBPRUJWSKNEF";
  //var seed=null;
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    dbo
      .collection("SEEDS")
      .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] }, function (
        err,
        result
      ) {
        if (err) throw err;
        console.log(result.SEED);
        db.close();
      });
  });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function generateSeed(id, password, info) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var charactersLength = characters.length;
  for (var i = 0; i < 81; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("Your New Seed is: " + result);

  addSeed(id, password, info, result);
  var seedstring = { Seed: result };
  var seed = JSON.stringify(seedstring);
  var fs = require("fs");
  fs.writeFile("config.json", seed, function (err, result) {
    if (err) console.log("error", err);
  });
  return result;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function generateAddressLocally(
  seed,
  deviceNumber,
  seclevel,
  id,
  password,
  info
) {
  const Iota = require("@iota/core");
  const Converter = require("@iota/converter");
  const Sign = require("@iota/signing");
  var finalAddress = null;
  var subseed = Sign.subseed(Converter.trytesToTrits(seed), deviceNumber);

  var privateKey1 = Sign.key(subseed, 1 /*security level*/);
  var privateKey2 = Sign.key(subseed, 2 /*security level*/);
  var privateKey3 = Sign.key(subseed, 3 /*security level*/);

  var privateKey1Digests = Sign.digests(privateKey1);
  var privateKey2Digests = Sign.digests(privateKey2);
  var privateKey3Digests = Sign.digests(privateKey3);

  var privateKey1Address = Sign.address(privateKey1Digests);
  var privateKey2Address = Sign.address(privateKey2Digests);
  var privateKey3Address = Sign.address(privateKey3Digests);
  var seclevel1Address = Converter.tritsToTrytes(privateKey1Address);
  var seclevel2Address = Converter.tritsToTrytes(privateKey2Address);
  var seclevel3Address = Converter.tritsToTrytes(privateKey3Address);

  if (seclevel == 1) {
    finalAddress = seclevel1Address;
  } else if (seclevel == 2) {
    finalAddress = seclevel2Address;
  } else if (seclevel == 3) {
    finalAddress = seclevel3Address;
  } else {
    finalAddress = seclevel3Address;
  }

  addAddress(id, password, seed, info, finalAddress);
  return finalAddress;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function sendPublicTransaction(seed, address, message) {
  const Iota = require("@iota/core");
  const Converter = require("@iota/converter");

  const node = getNode();
  const iota = Iota.composeAPI({
    provider: node,
  });

  const depth = 3;
  const minimumWeightMagnitude = 14;
  const messageInTrytes = Converter.asciiToTrytes(message);
  const transfers = [
    {
      value: 0,
      address: address,
      message: messageInTrytes,
    },
  ];

  iota
    .prepareTransfers(seed, transfers)
    .then((trytes) => {
      return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then((bundle) => {
      //console.log("Transaction Hash is ="+bundle[0].hash)
      addTransaction(address, bundle[0].hash);
      //return String(bundle[0].hash);
      //return "Transaction Hash is "+bundle[0].hash;
    })
    .catch((err) => {
      console.error(err);
    });
  //addTransaction(address, null);
  return "Transaction Added To IOTA";
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getSingleData(address, time) {
  const Iota = require("@iota/core");
  const Extract = require("@iota/extract-json");
  const iota = Iota.composeAPI({
    provider: getNode(),
  });

  const tailTransactionHash = getSingleHash(address, time);
  console.log(tailTransactionHash);
  //     iota.getBundle(tailTransactionHash)
  // .then(bundle => {
  //     console.log(JSON.parse(Extract.extractJson(bundle)));
  // })
  // .catch(err => {
  //     console.error(err);
  // });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getSingleHash(address, time) {
  hash = [];
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    dbo
      .collection(address)
      .findOne({ timestamp: time }, function (err, result) {
        if (err) throw err;
        console.log(result.txHash);
        // hash.push(result.txHash);
        db.close();
      });
    // console.log(hash[0]);
  });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getAllHash(address, txDate) {
  var transactionArray = [];
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    dbo
      .collection(address)
      .find({ date: txDate })
      .toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (doc) {
          // if (err) throw err;
          transactionArray.push(doc._id);
        });
        console.log(transactionArray);
        // console.log(result);
        db.close();
      });
  });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function addSeed(id, password, info, seed) {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    var myobj = {
      _id: id,
      ID: id,
      PASSWORD: password,
      Profile: info,
      SEED: seed,
      streamRoot: null,
    };
    dbo.collection("SEEDS").insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("Seed Asset Stored");
      db.close();
    });
  });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function addAddress(id, pass, seed, info, finalAddress) {
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    var myobj = {
      _id: id,
      ID: id,
      PASSWORD: pass,
      SEED: seed,
      Profile: info,
      ADDRESS: finalAddress,
    };
    dbo.collection(seed).insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("Address Asset inserted");
      db.close();
    });
  });
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function addTransaction(address, hash) {
  const MongoClient = require("mongodb").MongoClient;
  const uri =
    "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    console.log("Hash is= " + hash);
    var myobj = {
      _id: hash,
      date: getDate(),
      timestamp: timestamp(),
      ADDRESS: address,
      txHash: hash,
    };
    dbo.collection(address).insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log("Transaction Asset inserted");
      db.close();
    });
  });
}

//********************************************************************************************//
//                                                                                            //
//--------------------------------------Code Under Development--------------------------------//
//                                                                                            //
//********************************************************************************************//

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function publicMAM(msg) {
  const Mam = require("@iota/mam");
  const { asciiToTrytes } = require("@iota/converter");

  let mamState = Mam.init(getNode());
  mamState = Mam.changeMode(mamState, "public");

  const publish = async (data) => {
    const trytes = asciiToTrytes(data);
    const message = Mam.create(mamState, trytes);

    mamState = message.state;

    await Mam.attach(message.payload, message.address, 3, 10);
    console.log("Sent message to the Tangle!");
    console.log("Address: " + message.root);
  };

  publish("Super public message");
  publish("Super public message2");
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function privateMAM(seed, msg) {
  const Mam = require("@iota/mam");
  const { asciiToTrytes } = require("@iota/converter");

  let mamState = Mam.init(getNode());

  const mamType = "restricted";
  const mamSecret = seed;

  mamState = Mam.changeMode(mamState, mamType, mamSecret);

  const publish = async (data) => {
    const trytes = asciiToTrytes(data);
    const message = Mam.create(mamState, trytes);

    mamState = message.state;

    await Mam.attach(message.payload, message.address, 3, 10);
    console.log("Sent message to the Tangle!");
    console.log("Address: " + message.root);
  };

  publish("Message 1");
  publish("Message 2");
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function fetchPublicMAM(mamRoot) {
  const Mam = require("@iota/mam");
  const { asciiToTrytes, trytesToAscii } = require("@iota/converter");

  // Enter root of the
  const root = mamRoot;

  async function initMam() {
    console.log("\r\n\r\n");
    console.log("Listening to MAM stream...");
    console.log("\r\n");
    await Mam.init(getNode());
  }

  async function checkMam() {
    if (root !== nextRoot) {
      root = nextRoot;
    }

    const data = await Mam.fetch(root, "public", null, showData);
    nextRoot = data.nextRoot;

    // Check again in 5 seconds
    setTimeout(checkMam, 5000);
  }

  // Start the monitoring!
  initMam();
  checkMam();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function fetchPrivateMAM(seed, mamRoot) {
  const Mam = require("@iota/mam");
  const { trytesToAscii } = require("@iota/converter");

  // Init State
  let root = mamRoot;
  const mamType = "restricted";
  const mamSecret = seed;

  let mamState = Mam.init(getNode());

  const logData = (data) => console.log(trytesToAscii(data));

  const execute = async () => {
    const resp = await Mam.fetch(root, mamType, mamSecret, logData);
  };
  execute();
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function sendPrivateTransaction(seed, addresss, msg) {}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function deleteAddress(seed, username, password) {}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getAllAddresses(seed) {
  var addressAray = [];
  MongoClient.connect(uri, function (err, db) {
    if (err) throw err;
    var dbo = db.db("thetamw1");
    dbo
      .collection(seed)
      .find()
      .toArray(function (err, result) {
        if (err) throw err;
        result.forEach(function (doc) {
          // if (err) throw err;
          addressAray.push(doc.ADDRESS);
        });
        console.log(addressAray);
        // console.log(result);
        db.close();
      });
  });
}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getAdressInfo(address)
{

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getLastTransaction(address) {}
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

seed =
  "VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY";
address =
  "LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA";

//sendPublicTransaction(seed, address, "This FYP Demonstration");
//generateSeed("Username2", "Password2", "Info")
//getSeed("Username1", "Password1")
//generateAddressLocally(seed, 4, 2, "Username2", "Password2", "Info" )
getAllAddresses(seed);
//getSingleData(address, "16:1:59/15-8-2020");
//var msg = getSeed("Username1", "Password1");
//console.log(msg);
//publicMAM("Hello")
// // console.log("Generated Seed is "+gSeed)

module.exports = {
  fetchPublicMAM,
  fetchPrivateMAM,
  generateAddressLocally,
  generateSeed,
  getAllHash,
  getSeed,
  getSingleData,
  privateMAM,
  publicMAM,
  sendPrivateTransaction,
  sendPublicTransaction,
};
