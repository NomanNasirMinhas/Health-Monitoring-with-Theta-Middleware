async function getMsg()
{
    const Mam = require('@iota/mam');
const { asciiToTrytes, trytesToAscii } = require('@iota/converter');
const mode = 'public';
const provider = 'https://nodes.devnet.iota.org';

// const mamExplorerLink = `https://mam-explorer.firebaseapp.com/?provider=${encodeURIComponent(provider)}&mode=${mode}&root=`;

    // Initialize MAM State
    let mamState = Mam.init(provider);


    // Callback used to pass data out of the fetch
// Callback used to pass data out of the fetch
const logData = data => console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n')

    root='A9RPTMXACYAWXUTDBLCZF9ZXFXMEDJFTDOHQWKQBUCKOYVUTWVABQKXSFAGYLYHOIXWIOAKPWKEYMMTFU'
    await Mam.fetch(root, mode, null, logData)

  }
var stream = getMsg()
// console.log(stream)