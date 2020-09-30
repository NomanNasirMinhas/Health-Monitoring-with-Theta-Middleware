const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
async function getMsg(root)
{

    const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')
const mode = 'public';
const provider = 'https://nodes.devnet.iota.org';
console.log("Checkpoint 1")
await Mam.fetch(root, mode, null, logData)
console.log("Checkpoint 2")
const result = await Mam.fetch(root, mode)
console.log(result.messages)
console.log("Checkpoint 3")
    // result.messages.forEach(message => console.log('Fetched and parsed', JSON.parse(trytesToAscii(message)), '\n'))
    console.log("Checkpoint 4")
}

getMsg('TFKOTT9PNVTGFXCA9NQTVDNPOAQLXW9SQTANMJ9FKZDVQFPXCAEQLXGEIWXPMLAKQOFBOFKMHH9BQYKLT')