function publicMAM()
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
          message: 'Message from Alice',
          timestamp: (new Date()).toLocaleString()
        })
      
        await publish({
          message: 'Message from Bob',
          timestamp: (new Date()).toLocaleString()
        })
      
        await publish({
          message: 'Message from Charlie',
          timestamp: (new Date()).toLocaleString()
        })
      
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

//let mamState = Mam.init('https://nodes.iota.cafe:443')
//mamState = Mam.changeMode(mamState, 'public')

/*console.log("Starting to Publish");
const publish = async data => {
  // Convert the JSON to trytes and create a MAM message
  const trytes = asciiToTrytes(data)
  const message = Mam.create(mamState, trytes)

  // Update the MAM state to the state of this latest message
  // We need this so the next publish action knows it's state
  mamState = message.state

  // Attach the message
  await Mam.attach(message.payload, message.address, 3, 9)
  console.log('Sent message to the Tangle!')
  console.log('Address: ' + message.root)
}
console.log("Published");
publish('Super public message')
publish('Super public message2')*/
}

function privateMAM(seed)
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
          message: 'Message from Alice',
          timestamp: (new Date()).toLocaleString()
        })
      
        await publish({
          message: 'Message from Bob',
          timestamp: (new Date()).toLocaleString()
        })
      
        await publish({
          message: 'Message from Charlie',
          timestamp: (new Date()).toLocaleString()
        })
      
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
publicMAM()