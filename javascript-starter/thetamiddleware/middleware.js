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
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var result = await dbo
      .collection("SEEDS")
      .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] });

    return result;
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

  await addSeed( id, password, info, result);

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

  await addAddress( id, password, seed, info, finalAddress);
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
      addTransaction( address, bundle[0].hash);
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

async function getSingleHash(address, time) {

  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var result = await dbo.collection(address).findOne({ timestamp: time });
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

async function getSeedInfo(seed)
{

  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var result = await dbo
      .collection("SEEDS")
      .findOne({ SEED:seed });
      console.log(result)
    var response = {
      username: result.ID,
      password: result.PASSWORD
    }
    return (response);
  } catch (err) {
    return err;
  }

}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
async function addSeed( id, password, info, seed) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myobj = {
      _id: id,
      ID: id,
      PASSWORD: password,
      Profile: info,
      SEED: seed,
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

async function addAddress( id, pass, seed, info, finalAddress) {
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
      streamRoot: null,
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

async function addTransaction( address, hash) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myobj = {
      _id: hash,
      date: getDate(),
      timestamp: timestamp(),
      ADDRESS: address,
      txHash: hash,
      isLatest: true
    };

    var myquery = { isLatest: true };
    var newvalues = { $set: { isLatest: false } };
    await dbo.collection(address).updateOne(myquery, newvalues);

    await dbo.collection(address).insertOne(myobj);
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
async function publicMAMpublish() {
  const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
const mode = 'public';
const provider = getNode();

const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`;
let mamState = Mam.init(provider);
const publish = async packet => {
  // Create MAM message as a string of trytes
  const trytes = asciiToTrytes(JSON.stringify(packet));
  const message = Mam.create(mamState, trytes);

  // Save your new mamState
  mamState = message.state;
  // Attach the message to the Tangle
  await Mam.attach(message.payload, message.address, 3, 9)

  console.log('Published', packet, '\n');
  return message.root
}
return publish;
}

async function publishMAMmsg(msg){
  var publish = await publicMAMpublish();
  var root = await publish({
    message: msg,
    timestamp: (new Date()).toLocaleString()
  });
  return root;
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
function encrypt(seed, address, text) {
  const crypto = require('crypto');
  const algorithm = 'aes-256-cbc';
  const key = seed.slice(0,32);
  const iv = address.slice(0,16);
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
 }

 function decrypt(seed, address, text) {
  const key = seed.slice(0,32);
 // const iv = address;
  const crypto = require('crypto');
  const algorithm = 'aes-256-cbc';
  let iv = Buffer.from(text.iv, 'hex');
  let encryptedText = Buffer.from(text.encryptedData, 'hex');
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
 }

async function sendPrivateTransaction(seed, addresss, msg)
{
  const encText = encrypt(seed, addresss, msg);
  await sendPublicTransaction(seed, addresss, encText);

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function updateAddressProfile( seed, address, info) {
  try {

    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myquery = { ADDRESS: address };
    var newvalues = { $set: { Profile: info } };
    await dbo.collection(seed).updateOne(myquery, newvalues);

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

async function getAddress( seed, id, pass) {
  try {

    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var result = await dbo
      .collection(seed)
      .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] });

   console.log(result.ADDRESS);
    return result;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function checkAddress( seedID, address) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");

    var seedInfo = await dbo
      .collection("SEEDS")
      .findOne({ ID : seedID });
      console.log(seedInfo);

    var result = await dbo
      .collection(seedInfo.SEED)
      .findOne({ ADDRESS:address });
      console.log(result);

    return result;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getAllAddresses( seed) {
  var addressAray = [];
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");

    var info = await dbo
      .collection(seed)
      .find({}, { projection: { _id: 0 } })
      .toArray();

    var i;
    for (i = 0; i < info.length; i++) {
      addressAray.push(info[i]);
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
async function adminLogin(id, pass) {
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var result = await dbo
      .collection("ADMIN")
      .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] });

      db.close()
      if (result == null)
        return false;
      else
      return true
  } catch (err) {
    return err;
  }
}

async function getAllSeeds(username, password) {
  var loggedIN = await adminLogin(username, password)
  if (loggedIN == true){
    var addressAray = [];
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");

    var info = await dbo
      .collection("SEEDS")
      .find({}, { projection: { _id: 0 } })
      .toArray();

    var i;
    db.close()
    for (i = 0; i < info.length; i++) {
      addressAray.push(info[i]);
    }
    return addressAray;
  } catch (err) {
    return err;
  }
  }

  else
  return ("Error")

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function updateStreamRoot(address, root) {
  try {

    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");
    var myquery = { ADDRESS: address };
    var newvalues = { $set: { streamRoot: root } };
    await dbo.collection(seed).updateOne(myquery, newvalues);

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

async function getAddressInfo( seed, address) {

  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");

    var info = await dbo.collection(seed).findOne({ ADDRESS: address });

    return info;
  } catch (err) {
    return err;
  }
}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getLastTransactionHash( address)
{
  try {
    var db = await MongoClient.connect(uri);
    var dbo = await db.db("thetamw1");

    var result = await dbo
      .collection(address)
      .findOne({ isLatest:true });
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

async function getPublicTransactionInfo(hash)
{
  try {
    const Iota = require('@iota/core');
    const Extract = require('@iota/extract-json');
    const iota = Iota.composeAPI({
      provider: getNode()
      });

      const tailTransactionHash = hash;
      const Converter = require('@iota/converter');

      var txData = await iota.getBundle(tailTransactionHash);
      //var txMsg = JSON.parse(Extract.extractJson(txData));
      var txMsg = Converter.trytesToAscii(txData[0].signatureMessageFragment.substring(0,2186));
      return txMsg;
  } catch (err) {
    return err;
  }

}

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

async function getPrivateTransactionInfo(seed, address, hash)
{
  var ecText = getPublicTransactionInfo(hash);
  var result = decrypt(seed, address, ecText);

}

///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

async function testing() {
  testSeed =
    "VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY";
  testAddress =
    "LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA";
//await sendPrivateTransaction(testSeed, testAddress, "Enrypted Text")
  //var lastresult = await getLastTransactionHash(testAddress);
  //var result = await getPrivateTransactionInfo(testSeed, testAddress, lastresult);
  //console.log(result);
 var root = await generateSeed("2", "2", "1")
 console.log(root);
}

module.exports = {
  checkAddress,
  generateSeed,
  getAddress,
  getAddressInfo,
  getAllAddresses,
  getAllHash,
  getLastTransactionHash,
  generateAddressLocally,
  getAllHash,
  getSeed,
  sendPublicTransaction,
  getPublicTransactionInfo,
  getSingleHash,
  updateAddressProfile,
  getSeedInfo,
  getAllSeeds,
  adminLogin,
  updateStreamRoot
};
