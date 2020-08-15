function addDevice(seed,deviceNumber,seclevel,id,password,info)
{
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

    MongoClient.connect(uri, function(err, db) {
      if (err) throw err;
      var dbo = db.db("thetamw1");
      var myobj = { _id: finalAddress, ID: id, PASSWORD: pass, SEED: seed, ADDRESS:finalAddress };
      dbo.collection(seed).insertOne(myobj, function(err, res) {
    if (err) throw err;
      console.log("1 document inserted");
      db.close();
  });
  return finalAddress;
});
    
}
