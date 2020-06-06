const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
const collection=null;

function connect(){
client.connect(err => {
collection = client.db("thetamw1").collection("seeds");
console.log("Connection Successful");
//client.close();
});
}

function disconnect(){
    client.close();
    console.log("Disconnected");
}

module.exports = {connect, disconnect, client, collection};