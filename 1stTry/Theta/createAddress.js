function createAddress(seed, index, id, pass){
    const Iota = require('@iota/core');
    const config = require('./config.js');
    const node = config.getNode();
    const iota = Iota.composeAPI({
        provider: node
        });
    
        //const securityLevel = 2;
       // const seed ='F9UCDYVQGGNZVVVZUHHRKBMKYRBXKELRWZE9S9UDGASMUXGBEEFGSEVQTEJBZSMPSDFZJLISPXFHPCE9Z';
    
        iota.getNewAddress(seed, { index: index, securityLevel: 2, total: 1 })
        .then(address => {
            
            console.log('Your address is: ' + address[0]);
            const MongoClient = require('mongodb').MongoClient;
            const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
            MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            var dbo = db.db("thetamw1");
            var myobj = { _id: address[0], ID: id, PASSWORD: pass, SEED: seed, ADDRESS:address };
            dbo.collection("ADDRESSES").insertOne(myobj, function(err, res) {
          if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
        return address[0];
      });
        })
        .catch(err => {
            console.log(err)
        });

        
}
//createAddress("FMNODCYYTFSMFLYPTZWJVYECQHUDASWSHZGKCJOSEDVWGKXLKSXOFOPNCEXXHUQYLVZNNQGQAETRHHDHL", 4,"ABCD","pass")
module.exports = {createAddress}