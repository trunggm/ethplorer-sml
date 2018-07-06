var Web3 = require('web3');
var Web3Account = require('web3-eth-accounts');
var abi = require('human-standard-token-abi');
var Tx = require('ethereumjs-tx');
var abi = require('human-standard-token-abi');
var moment = require('moment');

var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = "mongodb://127.0.0.1:27017/";
var mlabUrl = "mongodb://coinbase:8l4ckTh04@ds251849.mlab.com:51849/coinbase";
var dbname = "coinbase";
var userCollectionName = "users";
var accountCollectionName = "accounts";
var txCollectionName = "transactions";
var notifyCollectionName = "notifications";

var levelup = require('levelup');
var leveldown = require('leveldown');
var path = require('path');

var rinkebyUrl = "142.44.246.105:8545";
var localUrl = "127.0.0.1:8545";

const DATA_DIR = "E:\\Ethereum\\geth\\chaindata";

var worker = {};

worker.test = function () {
    var web3 = new Web3(new Web3.providers.HttpProvider("http://"+localUrl));
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://"+localUrl));
    }


    web3.eth.getBlock(1, function(error, result){
        if(!error)
            console.log(JSON.stringify(result));
        else
            console.error(error);
    });
}

worker.testDb = function () {

    var Geth = function () {}

    Geth.getStateRoot = function (blockNumber) {
        return console.log('stateRoot:', web3.eth.getBlock(blockNumber).stateRoot);
    }

    Geth.getStateRoot(1545);


    levelup(leveldown(DATA_DIR), function(err, db) {
        if (err) throw err

        db.put('name', 'levelup', function (err) {
          if (err) return console.log('Ooops!', err) // some kind of I/O error

          // 3) Fetch by key
          db.get('name', function (err, value) {
            if (err) return console.log('Ooops!', err) // likely the key was not found

            // Ta da!
            console.log('name=' + value)
          })
        })
    })
}

function explorerBlock(blockNumber, cb) {
    web3.eth.getBlock(blockNumber, function (err, rs) {
        if (err) {
            console.log(err);
        } else {
            if (rs) {
                console.log(rs);
                cb(blockNumber+1);
            }
        }
    })
}




worker.explorerBlockChain = function () {
    var web3 = global.web3;
    var dbo = global.dbo;
    dbo.collection("blocks").find().count(function (err, rs) {
        if (err) {
            console.log(err);
        } else {
            console.log("number block in db: ", rs);
            var startBlock = rs;
            web3.eth.getBlock(5538637, function (err, rs) {
                if (err) {
                    console.log(err);
                } else {
                    var currentBlock = rs["number"];
                    console.log(rs);
                    console.log("current block number: ", currentBlock);

                    if (startBlock == 0) {
                        startBlock = 1;
                    }
                    var block = rs;
                    dbo.collection("blocks").insertOne(block, function (err, rs) {
                        console.log("insert success");
                    });
                }
            });
        }
    });
}

worker.dosRouter = function () {
    var web3 = global.web3;
    var i = 3500000;
    setInterval(function () {
        web3.eth.getBlock(i, function (err, rs) {
            if (err) {
                console.log(err);
            } else {
                console.log(rs);
                var txs = rs["transactions"];
                var j = 0;
                setInterval(function () {
                    if (j < txs.length) {
                        web3.eth.getTransaction(txs[j], function (err, rs) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(rs);
                            }
                            j = j + 1;
                        })
                    }

                }, 12);
            }
            i = i + 1;
        })
    }, 120);
}



module.exports = worker;
