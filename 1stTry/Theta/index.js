// Require the IOTA library
const Iota = require('@iota/core');
const config = require('./config.js');
const seed=require('./createSeed.js');
const addrress=require('./createAddress.js');
const msg=require('./sendTransaction.js');
// const time=require('./timestamp.js')

// console.log(time.timestamp());

const node = "https://nodes.iota.cafe:443";
getseed = "FMNODCYYTFSMFLYPTZWJVYECQHUDASWSHZGKCJOSEDVWGKXLKSXOFOPNCEXXHUQYLVZNNQGQAETRHHDHL"
getAddress= "EWALYFUWAAKRFPXIELHOAYEFTNTMGJXOAXFMAPJIWIEJBODIIBNKAM9VQ9UCBDZNTBVHHUYDHHMKYLR9Z";

// console.log('Your Node is = '+ node);
// console.log('Your Seed is = '+ getseed);
// console.log('Your Address is = '+ getAddress);

msg.sendTransaction(getseed, getAddress, "Hello! This is transaction with timestamp");

// console.log('Your Node is = '+ node);
// console.log('Your Seed is = '+ getseed);
// console.log('Your Address is = '+ getAddress);

// const iota = Iota.composeAPI({
// provider: node
// });

// // Call the `getNodeInfo()` method for information about the node and the Tangle
// iota.getNodeInfo()
// // Convert the returned object to JSON to make the output more readable
// .then(info => console.log(JSON.stringify(info, null, 1)))
// .catch(err => {
//     // Catch any errors
//     console.log(err);
// });