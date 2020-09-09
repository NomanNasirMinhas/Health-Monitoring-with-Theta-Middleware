//const { asTransactionTrytes } = require('@iota/core/typings/core/src/createPrepareTransfers');

const { address } = require("@iota/signing");

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

async function getSeed(id, pass) {
  //return "QCEVFK9GMHAGLLVWE99EKEWMEGQUPUQXMTTVKEWXV9RVVPANPKNIC9MYZVASV9INYODGBGBPRUJWSKNEF";
  //var seed=null;
  try {
    var db = await MongoClient.connect(uri, {useUnifiedTopology:true});
    var dbo = await db.db("thetamw1");
    var result = await dbo
      .collection("SEEDS")
      .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] });
    db.close();
    return result.SEED;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function generateSeed(id, password, info) {
  var result = "";
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
  var charactersLength = characters.length;
  for (var i = 0; i < 81; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("Your New Seed is: " + result);

  await addSeed(id, password, info, result);
  return result;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function generateAddressLocally(
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

  await addAddress(id, password, seed, info, finalAddress);
  return finalAddress;
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function sendPublicTransaction(seed, address, message) {
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

  await iota
    .prepareTransfers(seed, transfers)
    .then((trytes) => {
      return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then((bundle) => {
      addTransaction(address, bundle[0].hash);
    })
    .catch((err) => {
      console.error(err);
    });
  return true;
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

async function getSingleHash(address, time) {
  //hash = [];
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var result = await dbo.collection(address).findOne({ timestamp: time });
    db.close();
    return result.txHash;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getAllHash(address, txDate) {
  var transactionArray = [];
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var info = await dbo
      .collection(address)
      .find({ date: txDate }, { projection: { _id: 1 } })
      .toArray();
    db.close();
    var i;
    for (i = 0; i < info.length; i++) {
      transactionArray.push(info[i]._id);
    }
    return transactionArray;
  } catch (err) {
    return err;
  }
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
async function addSeed(id, password, info, seed) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myobj = {
      _id: id,
      ID: id,
      PASSWORD: password,
      Profile: info,
      SEED: seed,
      streamRoot: null,
    };
    await dbo.collection("SEEDS").insertOne(myobj);
    return true;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function addAddress(id, pass, seed, info, finalAddress) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myobj = {
      _id: id,
      ID: id,
      PASSWORD: pass,
      SEED: seed,
      Profile: info,
      ADDRESS: finalAddress,
    };

    await dbo.collection(seed).insertOne(myobj);
    return true;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function addTransaction(address, hash) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myobj = {
      _id: hash,
      date: getDate(),
      timestamp: timestamp(),
      ADDRESS: address,
      txHash: hash,
    };
    await dbo.collection(address).insertOne(myobj);
    db.close();
    return true;
  } catch (err) {
    return err;
  }
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

async function deleteAddress(seed, address) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myquery = { ADDRESS: address };
    var newvalues = { $set: { Profile: null } };
    await dbo.collection(seed).updateOne(myquery, newvalues);
    db.close();
    return true;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getAllAddresses(seed) {
  var addressAray = [];
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var info = await dbo
      .collection(seed)
      .find({}, { projection: { _id: 0, Profile: 1 } })
      .toArray();
    db.close();
    var i;
    for (i = 0; i < info.length; i++) {
      addressAray.push(info[i].Profile);
    }
    return addressAray;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getAddressInfo(seed, address) {
  //var result = [];
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var info = await dbo.collection(seed).findOne({ ADDRESS: address });
    db.close();
    return info.Profile;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

function getLastTransaction(address) {}
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

//sendPublicTransaction(seed, address, "This FYP Demonstration");
//generateSeed("Username3", "Password3", "Info")
async function testing() {
  testSeed =
    "VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY";
  testAddress =
    "LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA";

  var result = await getSingleHash(testAddress, "17:59:19/28-8-2020");
  console.log(result);
}
//testing()
//generateAddressLocally(seed, 4, 2, "Username2", "Password2", "Info" )
//getAddressInfo(seed, address);
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
