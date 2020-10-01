const express = require("express");
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
  getSeedInfo
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
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET ALL TX HASHES HASHES CALL
  app.get("/getAllHash/:address&:date", async (req, res) => {
    const address = req.params.address;
    const txDate = req.params.date;
    try {
      const result = await getAllHash(dbo, address, txDate);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  //GET LAST TRANSACTION HASH CALL
  app.get("/getLastTx/:address", async (req, res) => {
    const address = req.params.address;
    try {
      const result = await getLastTransactionHash(dbo, address);
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
      res.status(201).json(result.SEED);
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
    const msg = req.body.msg;
    try {
      const result = await sendPublicTransaction(dbo, seed, address, msg);
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
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
