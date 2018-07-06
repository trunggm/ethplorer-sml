const DATA_DIR = "E:\\Ethereum\\geth\\chaindata";
var rinkebyUrl = "http://142.44.246.105:8545";
var mainNetUrl = "http://142.44.246.105:8545";
var wsMainNetUrl = "ws://142.44.246.105:8545";

var computeMainNetUrl = "http://10.142.0.3:8545";
var wsComputeMainNetUrl = "ws://10.142.0.3:8545";

var infuraMainNetUrl = "https://mainnet.infura.io/VXPXO7jmWurwcmzsIGdq";
var wsInfuraMainNetUrl = "wss://mainnet.infura.io/ws";

var myEtherMainNetUrl = "https://api.myetherapi.com/eth";
var wsMyEtherMainNetUrl = "ws://api.myetherapi.com/eth";
var gov = {}

gov.globalDb = function () {
    var path = require('path');
    var levelup = require('levelup');
    var leveldown = require('leveldown');

    /**
     * Level DB
     */

    var db = levelup(leveldown(DATA_DIR));


    /**
     * Global variable
     */
    global.db = db;
}

gov.globalWeb3 = function () {
    var Web3 = require('web3');
    var localUrl = "127.0.0.1:8545";
    var mainNetUrl = "142.44.246.105:8545";
    var web3 = new Web3(new Web3.providers.HttpProvider(infuraMainNetUrl));
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider(infuraMainNetUrl));
    }

    console.log("\n===========================================");
    console.log("========== Geth connected:", web3.isConnected(), "===========");
    console.log("===========================================\n");

    global.web3 = web3;
}

gov.globalMongoDB = function (cb) {
    var mongodb = require('mongodb');
    var MongoClient = mongodb.MongoClient;
    var dbUrl = "mongodb://127.0.0.1:27017/";
    var mlabUrl = "mongodb://coinbase:8l4ckTh04@ds251849.mlab.com:51849/coinbase";
    var dbname = "ethplorer";
    MongoClient.connect(dbUrl, {reconnectTries: 60, reconnectInterval: 1000}, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log("\n===========================================");
            console.log("======== MongoDB connected:", true,  "=========");
            console.log("===========================================\n");

            // global variable
            // console.log(db);
            cb(db);
        }

    });
}



module.exports = gov;
