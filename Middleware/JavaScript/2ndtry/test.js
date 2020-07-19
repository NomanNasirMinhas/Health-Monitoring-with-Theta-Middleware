///////////////////////////////
// Send Data
///////////////////////////////

const iotaLibrary = require('@iota/core')

const iota = iotaLibrary.composeAPI({
  provider: 'https://nodes.iota.cafe:443'
})

// Use a random seed as there is no tokens being sent.
const seed =
  'VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY'

// Create a variable for the address we will send too
const address =
  'LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA'

  const converter = require('@iota/converter')

  const message = "HELLOWORLD"
  
  const message_in_trytes = converter.asciiToTrytes(message)
  
  const transfers = [
    {
      value: 0,
      address: address,
      message: message_in_trytes
    }
  ]
  
  iota
    .prepareTransfers(seed, transfers)
    .then(trytes => iota.sendTrytes(trytes, (depth = 3), (mwm = 10)))
    .then(bundle => {
      console.log(bundle)
    })
    .catch(err => {
      console.error(err)
    })