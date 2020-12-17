const express = require("express");
const http = require('http')
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
var {
  checkAddress,
  generateSeed,
  getAddress,
  getAddressInfo,
  getAllAddresses,
  getAllHash,
  getLastTransactionHash,
  generateAddressLocally,
  getSeed,
  sendPublicTransaction,
  getPublicTransactionInfo,
  getSingleHash,
  updateAddressProfile,
  getSeedInfo,
  updateStreamRoot,
  getAllSeeds,
  adminLogin,
  publishMAMmsg,
  fetchPublicMAM,
  dropAddress,
  getStreamRoot,
  updateSeedProfile,
  updateSeedPassword,
  changePresDescription,
  dropSeed,
  getAllOldSeeds,
  getAlphaAddress

} = require("./middleware");

require("dotenv").config();

const app = express();

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

var message = () =>{return "Message from Function"}

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
});

MongoClient.connect(uri, { useUnifiedTopology: true }, (err, client) => {
  if (err) return console.error(err);
  console.log("Connected to Database");
  const dbo = client.db("thetamw1");

  app.get("/", (req, res) => {
    res.status(201).json("Welcome to Theta Middleware");
  });

  //GET ALL ADDRESSES CALL
  app.get("/getAllAddresses/:seed", async (req, res) => {
    const seed = req.params.seed;
    try {
      const result = await getAllAddresses(dbo, seed);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //Get Seed Information
  app.get("/forgotPassword/:seed", async (req, res) => {
    const seed = req.params.seed;
    console.log("Forgot Password Called")
    try {
      const result = await getSeedInfo(dbo, seed);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //Get Seed Information
  app.get("/dropAddress/:seed&:address", async (req, res) => {
    const seed = req.params.seed;
    const address = req.params.address;

    console.log("Forgot Password Called")
    try {
      const result = await dropAddress(dbo, seed, address);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //Drop Seed Information
  app.get("/dropSeed/:seed", async (req, res) => {
    const seed = req.params.seed;

    try {
      const result = await dropSeed(dbo, seed);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET SINGLE HASH CALL
  app.get("/getHash/:address&:time", async (req, res) => {
    const address = req.params.address;
    const time = req.params.time;
    try {
      const result = await getSingleHash(dbo, address, time);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET TRANSACTION INFO
  app.get("/getTx/:hash", async (req, res) => {
    const hash = req.params.hash;
    try {
      const result = await getPublicTransactionInfo(hash);
      res.status(201).json({response: result});

      } catch (err) {
        res.status(400).json({ message: err.message });
      }
  });

  //GET ALL TX HASHES HASHES CALL
  app.get("/getAllHash/:address&:date&:type", async (req, res) => {
    const address = req.params.address;
    const txDate = req.params.date;
    const txType = req.params.type;
    try {
      const result = await getAllHash(dbo, address, txDate, txType);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET LAST TRANSACTION HASH CALL
  app.get("/getLastTx/:address&:type", async (req, res) => {
    const address = req.params.address;
    const txType = req.params.type;
    try {
      const result = await getLastTransactionHash(dbo, address, txType);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET SEED CALL
  app.get("/getSeed/:id&:password", async (req, res) => {
    const id = req.params.id;
    const pass = req.params.password;
    try {
      const result = await getSeed(dbo, id, pass);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET All SEED CALL
  app.get("/getAllSeeds/:id&:password", async (req, res) => {
    const id = req.params.id;
    const pass = req.params.password;
    try {
      const result = await getAllSeeds(dbo, id, pass);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET All OLD SEED CALL
  app.get("/getAllOldSeeds/:id&:password", async (req, res) => {
    const id = req.params.id;
    const pass = req.params.password;
    try {
      const result = await getAllOldSeeds(dbo, id, pass);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET All SEED CALL
  app.get("/publishMAM/:seed&:address", async (req, res) => {
    const seed = req.params.seed;
    const address = req.params.address;
    try {
      const result = await publishMAMmsg(dbo, message, seed, address);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET All SEED CALL
  app.get("/getMAM/:seed&:address", async (req, res) => {
    try {
    const seed = req.params.seed;
    const address = req.params.address;
    const Mam = require("@iota/mam");
    const { asciiToTrytes, trytesToAscii } = require("@iota/converter");
    const mode = "public";
    const provider = "https://nodes.devnet.iota.org:443";

    let mamState = Mam.init(provider);
      io.on("connection", async (socket) => {
        console.log("MAM Fetch Socket Called");

        const logData = (data) => {
          var rec = JSON.stringify(trytesToAscii(data));
          io.emit("mamMsg", "rec");
          console.log("Data Recieved to Middleware ", rec)
        }
          // console.log("Fetched and parsed", JSON.parse(trytesToAscii(data)), "\n");
  
        root = await getStreamRoot(dbo, seed, address);
        console.log(`root is ${root}`)
  
        await Mam.fetch(root, mode, null, logData);

      });



      res.status(201).json(true);

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET MAM STREAM ROOT
  app.get("/getMAMroot/:seed&:address", async (req, res) => {
    const seed = req.params.seed;
    const address = req.params.address;
    try {
      const result = await getStreamRoot(dbo, seed, address);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //Admin Login Call
  app.get("/adminLogin/:id&:password", async (req, res) => {
    const id = req.params.id;
    const pass = req.params.password;
    try {
      const result = await adminLogin(dbo, id, pass);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //CHECK ADDRESS CALL
  app.get("/checkAddress/:seedID&:address", async (req, res) => {
    const seedID = req.params.seedID;
    const address = req.params.address;
    try {
      const result = await checkAddress(dbo, seedID, address);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET ADDRESS CALL
  app.get("/getAddress/:seed&:id&:pass", async (req, res) => {
    const seed = req.params.seed;
    const id = req.params.id;
    const password = req.params.pass;

    try {
      const result = await getAddress(dbo, seed, id, password);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET Alpha ADDRESS CALL
  app.get("/getAlphaAddress/:seed", async (req, res) => {
    const seed = req.params.seed;

    try {
      const result = await getAlphaAddress(dbo, seed);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET ADDRESS INFO CALL
  app.get("/getAddressInfo/:seed&:address", async (req, res) => {
    const seed = req.params.seed;
    const address = req.params.address;

    try {
      const result = await getAddressInfo(dbo, seed, address);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET ADDRESS INFO CALL
  app.get("/getPrediction/:temp&:hr&:spo2", async (req, res) => {
    const temp = req.params.temp;
    const hr = req.params.hr;
    const spo2 = req.params.spo2;

    try {
      const tf = require('@tensorflow/tfjs');
      const model = await tf.loadLayersModel('https://storage.googleapis.com/fyp_model/model.json');
      const data =  tf.tensor([[Number(temp), Number(hr), Number(spo2)]]);
      var prediction = await model.predict(data).data();
      prediction = (prediction[0]+ (prediction[0]/10))
      if (prediction > 99.9)
        prediction = 99.9
      res.status(201).json(prediction);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GENERATE NEW SEED
  app.post("/addSeed/", async (req, res) => {
    const id = req.body.id;
    const pass = req.body.password;
    const info = req.body.info;
    try {
      const result = await generateSeed(dbo, id, pass, info);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GENERATE NEW SEED
  app.post("/updateStreamRoot/", async (req, res) => {
    const seed = req.body.seed;
    const address = req.body.address;
    const root = req.body.root;
    try {
      const result = await updateStreamRoot(dbo, seed, address, root);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


  //GENERATE NEW ADDRESS
  app.post("/addAddress/", async (req, res) => {
    const seed = req.body.seed;
    const deviceNum = req.body.deviceNum;
    const secLevel = req.body.secLevel;
    const id = req.body.id;
    const pass = req.body.password;
    const info = req.body.info;
    try {
      const result = await generateAddressLocally(
        dbo,
        seed,
        deviceNum,
        secLevel,
        id,
        pass,
        info
      );
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //SEND PUBLIC TRANSACTION
  app.post("/sendTx/", async (req, res) => {
    const seed = req.body.seed;
    const address = req.body.address;
    const msg = req.body.Data;
    const txType = req.body.txType;
    try {
      const result = await sendPublicTransaction(dbo, seed, address, msg, txType);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //UPDATE ADDRESS PROFILE
  app.post("/updateAddressInfo/", async (req, res) => {
    const seed = req.body.seed;
    const address = req.body.address;
    const info = req.body.info;
    try {
      const result = await updateAddressProfile(dbo, seed, address, info);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //UPDATE SEED PROFILE
  app.post("/updateSeedInfo/", async (req, res) => {
    const seed = req.body.seed;
    const info = req.body.info;
    try {
      const result = await updateSeedProfile(dbo, seed, info);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //UPDATE SEED PASSWORD
  app.post("/updateSeedPassword/", async (req, res) => {
    const seed = req.body.seed;
    const pass = req.body.password;
    try {
      const result = await updateSeedPassword(dbo, seed, pass);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //UPDATE Prescription Status
  app.post("/changePresDescription/", async (req, res) => {
    const address = req.body.address;
    const hash = req.body.txHash;
    const status = req.body.status;

    try {
      const result = await changePresDescription(dbo, address, hash, status);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

});

