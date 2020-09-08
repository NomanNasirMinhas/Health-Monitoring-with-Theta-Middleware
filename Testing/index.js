const { getSeed, getAllHash } = require('thetamiddleware');

var1=require('thetamiddleware')
async function testing() {
    // testSeed =
    //   "VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY";
    // testAddress =
    //   "LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA";
  
    var result = await getSeed("Username1", "Password1");
    console.log(result);
  }

  testing()