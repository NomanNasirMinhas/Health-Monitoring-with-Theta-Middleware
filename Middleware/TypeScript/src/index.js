var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var address = require("@iota/signing").address;
var MongoClient = require("mongodb").MongoClient;
var _a = require('date-fns'), format = _a.format, compareAsc = _a.compareAsc;
var get = require("http").get;
var connect = require("http2").connect;
require('dotenv').config();
var Mam = require('@iota/mam');
var _b = require('@iota/converter'), asciiToTrytes = _b.asciiToTrytes, trytesToAscii = _b.trytesToAscii;
var uri = process.env.MONGO_URI;
// const uri =
// "mongodb+srv://spidy_admin:CsIcBnIcP786@thetamiddleware-pi0h1.gcp.mongodb.net/test?retryWrites=true&w=majority";
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function timestamp() {
    var today = new Date();
    var date = today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = time + "/" + date;
    console.log("Current time is " + dateTime);
    return dateTime;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getDate() {
    var today = format(new Date(), 'dd-MM-yyyy');
    return today;
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getNode() {
    var node = process.env.IOTA_NODE;
    return node;
}
function getSeed(id, pass) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection("SEEDS")
                            .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] })];
                case 3:
                    result = _a.sent();
                    if (result == null)
                        return [2 /*return*/, [false, null]];
                    else
                        return [2 /*return*/, [true, result]];
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function generateSeed(id, password, info) {
    return __awaiter(this, void 0, void 0, function () {
        var result, characters, charactersLength, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    result = "";
                    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
                    charactersLength = characters.length;
                    for (i = 0; i < 81; i++) {
                        result += characters.charAt(Math.floor(Math.random() * charactersLength));
                    }
                    return [4 /*yield*/, addSeed(id, password, info, result)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function generateAddressLocally(seed, deviceNumber, seclevel, id, password, info) {
    return __awaiter(this, void 0, void 0, function () {
        var Iota, Converter, Sign, finalAddress, subseed, privateKey1, privateKey2, privateKey3, privateKey1Digests, privateKey2Digests, privateKey3Digests, privateKey1Address, privateKey2Address, privateKey3Address, seclevel1Address, seclevel2Address, seclevel3Address;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Iota = require("@iota/core");
                    Converter = require("@iota/converter");
                    Sign = require("@iota/signing");
                    finalAddress = null;
                    subseed = Sign.subseed(Converter.trytesToTrits(seed), deviceNumber);
                    privateKey1 = Sign.key(subseed, 1 /*security level*/);
                    privateKey2 = Sign.key(subseed, 2 /*security level*/);
                    privateKey3 = Sign.key(subseed, 3 /*security level*/);
                    privateKey1Digests = Sign.digests(privateKey1);
                    privateKey2Digests = Sign.digests(privateKey2);
                    privateKey3Digests = Sign.digests(privateKey3);
                    privateKey1Address = Sign.address(privateKey1Digests);
                    privateKey2Address = Sign.address(privateKey2Digests);
                    privateKey3Address = Sign.address(privateKey3Digests);
                    seclevel1Address = Converter.tritsToTrytes(privateKey1Address);
                    seclevel2Address = Converter.tritsToTrytes(privateKey2Address);
                    seclevel3Address = Converter.tritsToTrytes(privateKey3Address);
                    if (seclevel == 1) {
                        finalAddress = seclevel1Address;
                    }
                    else if (seclevel == 2) {
                        finalAddress = seclevel2Address;
                    }
                    else if (seclevel == 3) {
                        finalAddress = seclevel3Address;
                    }
                    else {
                        finalAddress = seclevel3Address;
                    }
                    return [4 /*yield*/, addAddress(id, password, seed, info, finalAddress)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, finalAddress];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function sendPublicTransaction(seed, address, message) {
    return __awaiter(this, void 0, void 0, function () {
        var Iota, Converter, node, iota, depth, minimumWeightMagnitude, messageInTrytes, transfers;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Iota = require("@iota/core");
                    Converter = require("@iota/converter");
                    node = getNode();
                    iota = Iota.composeAPI({
                        provider: node
                    });
                    depth = 3;
                    minimumWeightMagnitude = 14;
                    messageInTrytes = Converter.asciiToTrytes(message);
                    transfers = [
                        {
                            value: 0,
                            address: address,
                            message: messageInTrytes
                        },
                    ];
                    return [4 /*yield*/, iota
                            .prepareTransfers(seed, transfers)
                            .then(function (trytes) {
                            return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
                        })
                            .then(function (bundle) {
                            addTransaction(address, bundle[0].hash);
                        })["catch"](function (err) {
                            console.error(err);
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getSingleHash(address, time) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo.collection(address).findOne({ timestamp: time })];
                case 3:
                    result = _a.sent();
                    return [2 /*return*/, result.txHash];
                case 4:
                    err_2 = _a.sent();
                    return [2 /*return*/, err_2];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getAllHash(address, txDate) {
    return __awaiter(this, void 0, void 0, function () {
        var transactionArray, db, dbo, info, i, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    transactionArray = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 2:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 3:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection(address)
                            .find({ date: txDate }, { projection: { _id: 1 } })
                            .toArray()];
                case 4:
                    info = _a.sent();
                    for (i = 0; i < info.length; i++) {
                        transactionArray.push(info[i]._id);
                    }
                    return [2 /*return*/, transactionArray];
                case 5:
                    err_3 = _a.sent();
                    return [2 /*return*/, err_3];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getSeedInfo(seed) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, response, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection("SEEDS")
                            .findOne({ SEED: seed })];
                case 3:
                    result = _a.sent();
                    console.log(result);
                    response = {
                        username: result.ID,
                        password: result.PASSWORD
                    };
                    return [2 /*return*/, (response)];
                case 4:
                    err_4 = _a.sent();
                    return [2 /*return*/, err_4];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function addSeed(id, password, info, seed) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, myobj, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    myobj = {
                        _id: id,
                        ID: id,
                        PASSWORD: password,
                        Profile: info,
                        SEED: seed
                    };
                    return [4 /*yield*/, dbo.collection("SEEDS").insertOne(myobj)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    err_5 = _a.sent();
                    return [2 /*return*/, err_5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function addAddress(id, pass, seed, info, finalAddress) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, myobj, err_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    myobj = {
                        _id: id,
                        ID: id,
                        PASSWORD: pass,
                        SEED: seed,
                        Profile: info,
                        ADDRESS: finalAddress,
                        streamRoot: null
                    };
                    return [4 /*yield*/, dbo.collection(seed).insertOne(myobj)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    err_6 = _a.sent();
                    return [2 /*return*/, err_6];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function addTransaction(address, hash) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, myobj, myquery, newvalues, err_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    myobj = {
                        _id: hash,
                        date: getDate(),
                        timestamp: timestamp(),
                        ADDRESS: address,
                        txHash: hash,
                        isLatest: true
                    };
                    myquery = { isLatest: true };
                    newvalues = { $set: { isLatest: false } };
                    return [4 /*yield*/, dbo.collection(address).updateOne(myquery, newvalues)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dbo.collection(address).insertOne(myobj)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, true];
                case 5:
                    err_7 = _a.sent();
                    return [2 /*return*/, err_7];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function updateAddressProfile(seed, address, info) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, myquery, newvalues, err_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    myquery = { ADDRESS: address };
                    newvalues = { $set: { Profile: info } };
                    return [4 /*yield*/, dbo.collection(seed).updateOne(myquery, newvalues)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    err_8 = _a.sent();
                    return [2 /*return*/, err_8];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getAddress(seed, id, pass) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, err_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection(seed)
                            .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] })];
                case 3:
                    result = _a.sent();
                    console.log(result.ADDRESS);
                    return [2 /*return*/, result];
                case 4:
                    err_9 = _a.sent();
                    return [2 /*return*/, err_9];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function checkAddress(seedID, address) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, seedInfo, result, err_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection("SEEDS")
                            .findOne({ ID: seedID })];
                case 3:
                    seedInfo = _a.sent();
                    console.log(seedInfo);
                    return [4 /*yield*/, dbo
                            .collection(seedInfo.SEED)
                            .findOne({ ADDRESS: address })];
                case 4:
                    result = _a.sent();
                    console.log(result);
                    return [2 /*return*/, result];
                case 5:
                    err_10 = _a.sent();
                    return [2 /*return*/, err_10];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getAllAddresses(seed) {
    return __awaiter(this, void 0, void 0, function () {
        var addressAray, db, dbo, info, i, err_11;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    addressAray = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 2:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 3:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection(seed)
                            .find({}, { projection: { _id: 0 } })
                            .toArray()];
                case 4:
                    info = _a.sent();
                    for (i = 0; i < info.length; i++) {
                        addressAray.push(info[i]);
                    }
                    return [2 /*return*/, addressAray];
                case 5:
                    err_11 = _a.sent();
                    return [2 /*return*/, err_11];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function dropAddress(seed, address) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, err_12;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo.collection(seed).deleteOne({ ADDRESS: address })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dbo.collection(seed).drop()];
                case 4:
                    _a.sent();
                    return [2 /*return*/, true];
                case 5:
                    err_12 = _a.sent();
                    return [2 /*return*/, err_12];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function adminLogin(id, pass) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, err_13;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection("ADMIN")
                            .findOne({ $and: [{ ID: id }, { PASSWORD: pass }] })];
                case 3:
                    result = _a.sent();
                    db.close();
                    if (result == null)
                        return [2 /*return*/, false];
                    else
                        return [2 /*return*/, true];
                    return [3 /*break*/, 5];
                case 4:
                    err_13 = _a.sent();
                    return [2 /*return*/, err_13];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function getAllSeeds(username, password) {
    return __awaiter(this, void 0, void 0, function () {
        var loggedIN, addressAray, db, dbo, info, i, err_14;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, adminLogin(username, password)];
                case 1:
                    loggedIN = _a.sent();
                    if (!(loggedIN == true)) return [3 /*break*/, 8];
                    addressAray = [];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 6, , 7]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 3:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 4:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection("SEEDS")
                            .find({}, { projection: { _id: 0 } })
                            .toArray()];
                case 5:
                    info = _a.sent();
                    db.close();
                    for (i = 0; i < info.length; i++) {
                        addressAray.push(info[i]);
                    }
                    return [2 /*return*/, addressAray];
                case 6:
                    err_14 = _a.sent();
                    return [2 /*return*/, err_14];
                case 7: return [3 /*break*/, 9];
                case 8: return [2 /*return*/, ("Error")];
                case 9: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function updateStreamRoot(seed, address, root) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, myquery, newvalues, err_15;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    myquery = { ADDRESS: address };
                    newvalues = { $set: { streamRoot: root } };
                    return [4 /*yield*/, dbo.collection(seed).updateOne(myquery, newvalues)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, true];
                case 4:
                    err_15 = _a.sent();
                    return [2 /*return*/, err_15];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getStreamRoot(seed, address) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, err_16;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection(seed)
                            .findOne({ ADDRESS: address })];
                case 3:
                    result = _a.sent();
                    if (result.streamRoot.toString().length === 0)
                        return [2 /*return*/, false];
                    else
                        return [2 /*return*/, result.streamRoot];
                    return [3 /*break*/, 5];
                case 4:
                    err_16 = _a.sent();
                    return [2 /*return*/, err_16];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getAddressInfo(seed, address) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, info, err_17;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo.collection(seed).findOne({ ADDRESS: address })];
                case 3:
                    info = _a.sent();
                    return [2 /*return*/, info];
                case 4:
                    err_17 = _a.sent();
                    return [2 /*return*/, err_17];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getLastTransactionHash(address) {
    return __awaiter(this, void 0, void 0, function () {
        var db, dbo, result, err_18;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, MongoClient.connect(uri)];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.db("thetamw1")];
                case 2:
                    dbo = _a.sent();
                    return [4 /*yield*/, dbo
                            .collection(address)
                            .findOne({ isLatest: true })];
                case 3:
                    result = _a.sent();
                    db.close();
                    if (result == null)
                        return [2 /*return*/, false];
                    else
                        return [2 /*return*/, result.txHash];
                    return [3 /*break*/, 5];
                case 4:
                    err_18 = _a.sent();
                    return [2 /*return*/, err_18];
                case 5: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function getPublicTransactionInfo(hash) {
    return __awaiter(this, void 0, void 0, function () {
        var Iota, Extract, iota, tailTransactionHash, Converter, txData, txMsg, err_19;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    Iota = require('@iota/core');
                    Extract = require('@iota/extract-json');
                    iota = Iota.composeAPI({
                        provider: getNode()
                    });
                    tailTransactionHash = hash;
                    Converter = require('@iota/converter');
                    return [4 /*yield*/, iota.getBundle(tailTransactionHash)];
                case 1:
                    txData = _a.sent();
                    txMsg = Converter.trytesToAscii(txData[0].signatureMessageFragment.substring(0, 2186));
                    return [2 /*return*/, txMsg];
                case 2:
                    err_19 = _a.sent();
                    return [2 /*return*/, err_19];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// async function getPrivateTransactionInfo(seed:String, address:String, hash:String)
// {
//   var ecText = getPublicTransactionInfo(hash);
//   var result = decrypt(seed, address, ecText);
// }
//********************************************************************************************//
//                                                                                            //
//--------------------------------------Code Under Development--------------------------------//
//                                                                                            //
//********************************************************************************************//
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function publishMAMmsg(func, seed, address) {
    return __awaiter(this, void 0, void 0, function () {
        var Mam, _a, asciiToTrytes, trytesToAscii, mode, provider, mamState, publish, publishAll;
        var _this = this;
        return __generator(this, function (_b) {
            Mam = require('@iota/mam');
            _a = require('@iota/converter'), asciiToTrytes = _a.asciiToTrytes, trytesToAscii = _a.trytesToAscii;
            mode = 'public';
            provider = 'https://nodes.devnet.iota.org';
            mamState = Mam.init(provider);
            publish = function (packet) { return __awaiter(_this, void 0, void 0, function () {
                var trytes, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            trytes = asciiToTrytes(JSON.stringify(packet));
                            message = Mam.create(mamState, trytes);
                            // Save your new mamState
                            mamState = message.state;
                            // Attach the message to the Tangle
                            return [4 /*yield*/, Mam.attach(message.payload, message.address, 3, 9)];
                        case 1:
                            // Attach the message to the Tangle
                            _a.sent();
                            console.log('Published', packet);
                            // console.log('Root = ', message.root, '\n');
                            return [2 /*return*/, message.root];
                    }
                });
            }); };
            publishAll = function (func) { return __awaiter(_this, void 0, void 0, function () {
                var root, initial, msg;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            root = null;
                            initial = true;
                            _a.label = 1;
                        case 1:
                            if (!true) return [3 /*break*/, 6];
                            msg = func();
                            if (!initial) return [3 /*break*/, 3];
                            return [4 /*yield*/, publish({
                                    message: msg,
                                    timestamp: (new Date()).toLocaleString()
                                })];
                        case 2:
                            root = _a.sent();
                            updateStreamRoot(seed, address, root);
                            console.log("Root is ", root);
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, publish({
                                message: msg,
                                timestamp: (new Date()).toLocaleString()
                            })];
                        case 4:
                            _a.sent();
                            _a.label = 5;
                        case 5:
                            initial = false;
                            return [3 /*break*/, 1];
                        case 6:
                            console.log("Root is ", root);
                            return [2 /*return*/, root];
                    }
                });
            }); };
            publishAll(func);
            return [2 /*return*/];
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function privateMAM(seed, msg) {
    var _this = this;
    var Mam = require("@iota/mam");
    var asciiToTrytes = require("@iota/converter").asciiToTrytes;
    var mamState = Mam.init(getNode());
    var mamType = "restricted";
    var mamSecret = seed;
    mamState = Mam.changeMode(mamState, mamType, mamSecret);
    var publish = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var trytes, message;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    trytes = asciiToTrytes(data);
                    message = Mam.create(mamState, trytes);
                    mamState = message.state;
                    return [4 /*yield*/, Mam.attach(message.payload, message.address, 3, 10)];
                case 1:
                    _a.sent();
                    console.log("Sent message to the Tangle!");
                    console.log("Address: " + message.root);
                    return [2 /*return*/];
            }
        });
    }); };
    publish("Message 1");
    publish("Message 2");
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function fetchPublicMAM(seed, address) {
    return __awaiter(this, void 0, void 0, function () {
        var mode, provider, mamState, logData, root;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mode = 'public';
                    provider = getNode();
                    mamState = Mam.init(provider);
                    logData = function (data) { return console.log('Fetched and parsed', JSON.parse(trytesToAscii(data)), '\n'); };
                    console.log("Getting Root");
                    return [4 /*yield*/, getStreamRoot(seed, address)];
                case 1:
                    root = _a.sent();
                    console.log("MAM Root is =", root);
                    return [4 /*yield*/, Mam.fetch(root.toString(), mode, null, logData)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
function fetchPrivateMAM(seed, mamRoot) {
    var _this = this;
    var Mam = require("@iota/mam");
    var trytesToAscii = require("@iota/converter").trytesToAscii;
    // Init State
    var root = mamRoot;
    var mamType = "restricted";
    var mamSecret = seed;
    var mamState = Mam.init(getNode());
    var logData = function (data) { return console.log(trytesToAscii(data)); };
    var execute = function () { return __awaiter(_this, void 0, void 0, function () {
        var resp;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Mam.fetch(root, mamType, mamSecret, logData)];
                case 1:
                    resp = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    execute();
}
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
//                                                                                            //
//--------------------------------------New Function------------------------------------------//
//                                                                                            //
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
// function encrypt(seed:String, address:String, text:String) {
//   const crypto = require('crypto');
//   const algorithm = 'aes-256-cbc';
//   const key = seed.slice(0,32);
//   const iv = address.slice(0,16);
//   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let encrypted = cipher.update(text);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);
//   return { iv: iv.toString(), encryptedData: encrypted.toString('hex') };
//  }
//  function decrypt(seed:String, address:String, text:String) {
//   const key = seed.slice(0,32);
//  // const iv = address;
//   const crypto = require('crypto');
//   const algorithm = 'aes-256-cbc';
//   let iv = Buffer.from(text.iv, 'hex');
//   let encryptedText = Buffer.from(text.encryptedData, 'hex');
//   let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
//   let decrypted = decipher.update(encryptedText);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);
//   return decrypted.toString();
//  }
// async function sendPrivateTransaction(seed, addresss, msg)
// {
//   const encText = encrypt(seed, addresss, msg);
//   await sendPublicTransaction(seed, addresss, encText);
// }
///////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
function testing() {
    return __awaiter(this, void 0, void 0, function () {
        var testSeed, testAddress, root;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testSeed = "VLLPIQLDNUXPF9ECVNDQTDQITIQBSTNWJPXSHWEMHSDYHOEZT9CMMRKOIFRZPSJVDBZGJOYMXM9KPJAPY";
                    testAddress = "LZK9VJPEJNKHKNADMKYIQVBLWRW9YEXBDPGSYMONHFGVXDHQ9FRLPDPCCHNYAJRCQSJWKWHBFHKYNPCHA";
                    return [4 /*yield*/, generateSeed("2", "2", "1")];
                case 1:
                    root = _a.sent();
                    console.log(root);
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = {
    checkAddress: checkAddress,
    generateSeed: generateSeed,
    getAddress: getAddress,
    getAddressInfo: getAddressInfo,
    getAllAddresses: getAllAddresses,
    getLastTransactionHash: getLastTransactionHash,
    generateAddressLocally: generateAddressLocally,
    getAllHash: getAllHash,
    getSeed: getSeed,
    sendPublicTransaction: sendPublicTransaction,
    getPublicTransactionInfo: getPublicTransactionInfo,
    getSingleHash: getSingleHash,
    updateAddressProfile: updateAddressProfile,
    getSeedInfo: getSeedInfo,
    getAllSeeds: getAllSeeds,
    adminLogin: adminLogin,
    updateStreamRoot: updateStreamRoot,
    publishMAMmsg: publishMAMmsg,
    fetchPublicMAM: fetchPublicMAM,
    dropAddress: dropAddress
};
