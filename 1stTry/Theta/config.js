function getNode()
    {
        try{
            const fs = require('fs');
            let rawdata = fs.readFileSync('config.json');
            let data = JSON.parse(rawdata);
            var node = data['Node'];
            if (node!=null)
            {
                console.log("Your Node Address is: "+ node);
                return node;
            }
            
            else{
                console.log("Node value is invalid");
                return null;
            }
            }
            catch(e)
            {
                console.log("Config File Not Found");
                return null;
            }
    }

    function getSeed()
    {
        try{
            const fs = require('fs');
            let rawdata = fs.readFileSync('config.json');
            let data = JSON.parse(rawdata);
            var seed = data['Seed'];
            if (seed!=null)
            {
                console.log("Your Seed is: "+ seed);
                return seed;
            }
            
            else{
                console.log("Seed value is invalid");
                return null;
            }
            }
            catch(e)
            {
                console.log("Config File Not Found");
                return null;
            }
    }

module.exports = {getNode, getSeed}