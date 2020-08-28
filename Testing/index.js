const { getSeed, getAllHash } = require('thetamiddleware');

var1=require('thetamiddleware')
async function testing() {
    testSeed =
      "VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY";
    testAddress =
      "LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA";
  
    var result = await getAllHash(testAddress, "28-8-2020");
    console.log(result);
  }

  testing()