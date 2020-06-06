function sendTransaction(seed, address, message){

const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const config=require('./config.js');
const time=require('./timestamp.js')


const node=config.getNode();
const iota = Iota.composeAPI
(
    {
    provider: node
    }
    );

const depth = 3;
const minimumWeightMagnitude = 14;
//const address ='NOMANWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
//const seed ='NOMANSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';
//const message = JSON.stringify({"message": "I Am Noman Minhas. I Am Developing Theta Middleware"});
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [
    {
        value: 0,
        address: address,
        message: messageInTrytes
    }
    ];

    var hash=iota.prepareTransfers(seed, transfers)
    .then(trytes => {
        return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
    })
    .then(bundle => {
        //return String(bundle[0].hash);
        return "Transaction Hash is "+bundle[0].hash;
    })
    .catch(err => {
        console.error(err)
    });

            const MongoClient = require('mongodb').MongoClient;
            const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
            MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("thetamw1");
            console.log("Hash is= "+hash);
            var myobj = { _id: null, timestamp:time.timestamp(), ADDRESS:address };
            dbo.collection(address).insertOne(myobj, function(err, res) {
          if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });

}

module.exports = {sendTransaction}
