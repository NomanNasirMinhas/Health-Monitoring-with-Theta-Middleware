function getSingleTransaction(hash)
{
    const Iota = require('@iota/core');
    const Extract = require('@iota/extract-json');
    const config=require('./config.js');
    const iota = Iota.composeAPI({
        provider: config.getNode()
        });

        const tailTransactionHash =hash;
        iota.getBundle(tailTransactionHash)
        .then(bundle => {
            //console.log(bundle);
            console.log(JSON.parse(Extract.extractJson(bundle)));
            })
        .catch(err => {
            console.error(err);
            });
    

}

getSingleTransaction('NVPBHRAGRLHPVPV9BAJPWRDHFFVJUYFOKKPJHZBQNZCHGQPYOEEKMATKFFBYYYDHJABADYUKGHEFZ9999')