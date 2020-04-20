function timestamp()
{
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time+'/'+date;
    console.log("Current time is "+dateTime);
    return dateTime;
}

function getNode()
    {
        return "https://nodes.iota.cafe:443";
    }

    function getSeed()
    {
        return "QCEVFK9GMHAGLLVWE99EKEWMEGQUPUQXMTTVKEWXV9RVVPANPKNIC9MYZVASV9INYODGBGBPRUJWSKNEF";
    }

function generateSeed(id, password, info){
    
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    var charactersLength = characters.length;
    for ( var i = 0; i < 81; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    console.log("Your New Seed is: "+result);
      
    addSeed(id, password, info, result);
    var seedstring={"Seed" : result};
    var seed = JSON.stringify(seedstring);
    var fs = require('fs');
    fs.writeFile("config.json", seed, function(err, result) {
    if(err) console.log('error', err);
             });
    return result;
}

function generateAddressLocally(seed,deviceNumber,seclevel,id,password,info){
    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    const Sign = require('@iota/signing');
   const finalAddress=null;    
    var subseed = Sign.subseed(Converter.trytesToTrits(seed), deviceNumber);
    
    var privateKey1 = Sign.key(subseed, 1 /*security level*/);
 //   console.log('Private key length for security level 1: ' + Converter.tritsToTrytes(privateKey1).length);
    var privateKey2 = Sign.key(subseed, 2 /*security level*/);
 //   console.log('Private key length for security level 2: ' + Converter.tritsToTrytes(privateKey2).length);
    var privateKey3 = Sign.key(subseed, 3 /*security level*/);
 //   console.log('Private key length for security level 3: ' + Converter.tritsToTrytes(privateKey3).length);

    var privateKey1Digests = Sign.digests(privateKey1);
 //   console.log(`Total key digests for security level 1: ` + Converter.tritsToTrytes(privateKey1Digests).length/81);
    var privateKey2Digests = Sign.digests(privateKey2);
 //   console.log(`Total key digests for security level 2: ` + Converter.tritsToTrytes(privateKey2Digests).length/81);
    var privateKey3Digests = Sign.digests(privateKey3);
 //   console.log(`Total key digests for security level 3: ` + Converter.tritsToTrytes(privateKey3Digests).length/81);

    var privateKey1Address = Sign.address(privateKey1Digests);
    var privateKey2Address = Sign.address(privateKey2Digests);
    var privateKey3Address = Sign.address(privateKey3Digests);
    var seclevel1Address=Converter.tritsToTrytes(privateKey1Address);
    var seclevel2Address=Converter.tritsToTrytes(privateKey2Address);
    var seclevel3Address=Converter.tritsToTrytes(privateKey3Address);
    
    if(seclevel==1)
    {finalAddress= seclevel1Address;}
    else if(seclevel==2)
    {finalAddress= seclevel2Address;}
    else if(seclevel==3)
    {finalAddress= seclevel3Address;}
    else
    {finalAddress= seclevel3Address;}

    addAddress(id, password, seed, info, finalAddress);
        return finalAddress;
}

function sendPublicTransaction(seed, address, message){

    const Iota = require('@iota/core');
    const Converter = require('@iota/converter');
    
    
    const node=getNode();
    const iota = Iota.composeAPI
    (
        {
        provider: node
        }
        );
    
    const depth = 3;
    const minimumWeightMagnitude = 14;
    const messageInTrytes = Converter.asciiToTrytes(message);
    const transfers = [
        {
            value: 0,
            address: address,
            message: messageInTrytes
        }
        ];
    
        iota.prepareTransfers(seed, transfers)
        .then(trytes => {
            return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
        })
        .then(bundle => {
            console.log("Transaction Hash is ="+bundle[0].hash)
            //return String(bundle[0].hash);
            //return "Transaction Hash is "+bundle[0].hash;
        })
        .catch(err => {
            console.error(err)
        });
        addTransaction(address, null);
        return "Transaction Added To IOTA"
    }


    function sendPrivateTransaction(seed, addresss, msg)
    {

    }

    function getSingleHash(address,time)
    {
        const MongoClient = require('mongodb').MongoClient;
     const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
     MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("thetamw1");
        var myobj = { _id: seed, ID: id, PASSWORD: password, Profile:info, SEED: seed };
        transaction = null;
        transaction = dbo.collection(address).find({timestamp:time})
        db.close();
        return transaction;
      });
    }


    function getBundledHash(timeTo, timeFrom)
    {

    }

function addSeed(id, password, info, seed){
    const MongoClient = require('mongodb').MongoClient;
     const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
     MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("thetamw1");
        var myobj = { _id: seed, ID: id, PASSWORD: password, Profile:info, SEED: seed };
        dbo.collection("SEEDS").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("Seed Asset Stored");
          db.close();
        });
      });
}

function addAddress(id, pass, seed, info,finalAddress){
    MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("thetamw1");
        var myobj = { _id: finalAddress, ID: id, PASSWORD: pass, SEED: seed, Profile:info, ADDRESS:finalAddress };
        dbo.collection(seed).insertOne(myobj, function(err, res) {
      if (err) throw err;
        console.log("Address Asset inserted");
        db.close();
    });
  });
}

function addTransaction(address,hash)
{
    const MongoClient = require('mongodb').MongoClient;
                const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
                MongoClient.connect(uri, function(err, db) {
                if (err) throw err;
                var dbo = db.db("thetamw1");
                console.log("Hash is= "+hash);
                var myobj = { _id: null, timestamp:timestamp(), ADDRESS:address };
                dbo.collection(address).insertOne(myobj, function(err, res) {
              if (err) throw err;
                console.log("Transaction Asset inserted");
                db.close();
            });
        });
}

function publicMAM(msg)
{
    const Mam = require('@iota/mam');
    const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
    const mode = 'public';
    const provider = 'https://nodes.devnet.iota.org';
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

    const publishAll = async () => {
        const root = await publish({
          message: msg,
          timestamp: timestamp()
        })
      
        // await publish({
        //   message: 'Message from Bob',
        //   timestamp: (new Date()).toLocaleString()
        // })
      
        // await publish({
        //   message: 'Message from Charlie',
        //   timestamp: (new Date()).toLocaleString()
        // })
        console.log("Public MAM Root ="+root);      
        return root
      }

      // Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

publishAll()
  .then(async root => {

    // Output asynchronously using "logData" callback function
    await Mam.fetch(root, mode, null, logData)

    // Output synchronously once fetch is completed
    const result = await Mam.fetch(root, mode)
    result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));
    console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
})


function privateMAM(seed, msg)
{
    const Mam = require('@iota/mam');
    const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
    const mode = 'restricted';
    const sideKey = seed;
    const provider = 'https://nodes.devnet.iota.org';
    const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&key=${sideKey.padEnd(81, '9')}&root=`;
    let mamState = Mam.init(provider);
    mamState = Mam.changeMode(mamState, mode, sideKey);

    const publish = async packet => {
        // Create MAM message as a string of trytes
        const trytes = asciiToTrytes(JSON.stringify(packet));
        const message = Mam.create(mamState, trytes);
    
        // Save your new mamState
        mamState = message.state;
        // Attach the message to the Tangle
        await Mam.attach(message.payload, message.address, 3, 9)
    
        console.log('Published', packet, '\n');
        console.log("MAM CHANNEL ID: "+message.root)
        return message.root
    }

    const publishAll = async () => {
        const root = await publish({
          message: msg,
          timestamp: (new Date()).toLocaleString()
        })
      
        // await publish({
        //   message: message,
        //   timestamp: (new Date()).toLocaleString()
        // })
      
        // await publish({
        //   message: 'Message from Charlie',
        //   timestamp: (new Date()).toLocaleString()
        // })
        console.log("This is root Public MAM ="+root);
        return root
      }

      // Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n');

publishAll()
  .then(async root => {

  const result = await Mam.fetch(root, mode, sideKey)
  result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'));
  console.log(`Verify with MAM Explorer:\n${mamExplorerLink}${root}\n`);
});
}
}

generateSeed("Hello","Password","No Info")