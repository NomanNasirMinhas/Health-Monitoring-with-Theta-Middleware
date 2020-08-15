
function generateSeed(id, password){
    
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
    var charactersLength = characters.length;
    for ( var i = 0; i < 81; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    console.log("Your New Seed is: "+result);
     const MongoClient = require('mongodb').MongoClient;
     const uri = "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
     MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        var dbo = db.db("thetamw1");
        var myobj = { _id: result, ID: id, PASSWORD: password, SEED: result };
        dbo.collection("SEEDS").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });

      var seedstring={"Seed" : result};
      var seed = JSON.stringify(seedstring);
      var fs = require('fs');
      fs.writeFile("config.json", seed, function(err, result) {
      if(err) console.log('error', err);
             });
    return result;
}


module.exports = {generateSeed}
//generateSeed('alpha', '123456');

// function createSeed()
// {
//     const config=require('config.js');
//     try{
        
//         var seed = config.getSeed();
//         if (seed!=null)
//         {
//             console.log("Your Seed is: "+ seed);
//             return seed;
//         }
        
//         else{
//             generateNewSeed();
//         }
//         }
//         catch(e)
//         {
//             generateNewSeed();
//         }
        
//         function generateNewSeed()
//         {
//             var result           = '';
//             var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ9';
//             var charactersLength = characters.length;
//             for ( var i = 0; i < 81; i++ ) {
//                result += characters.charAt(Math.floor(Math.random() * charactersLength));
//             }
//             console.log("Your New Seed is: "+result);
        
//             var seedstring={"Seed" : result};
//             var seed = JSON.stringify(seedstring);
//             var fs = require('fs');
//             fs.writeFile("config.json", seed, function(err, result) {
//             if(err) console.log('error', err);
//             });
        
//             return result;
//         }
// }
