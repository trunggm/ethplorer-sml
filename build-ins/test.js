// var db = global.db;
var web3 = global.web3;
var ethBlock = require('ethereumjs-block');
var levelup = require('levelup');
var leveldown = require('leveldown');
const DATA_DIR = "E:\\Ethereum\\geth\\chaindata";


var test = {};
test.test = function () {

    /**
     * For debugging
     */
    var blockNumber = 235342;

    // console.log("For debugging:");
    // geth.getStateRoot(blockNumber);
    // console.log("\n");

    /**
     * Constants
     */
    const prefix = utils.stringToHex('h');
    const suffix = utils.stringToHex('n');

    /**
     * Test leveldb
     */

    var hexBlockNumber = utils.padLeft(utils.decimalToHex(blockNumber), 16);
    var keyString = prefix + hexBlockNumber + suffix;
    var key = new Buffer(keyString, 'hex');

    console.log('Block Number:', key);
    db.get(key, function (er, value) {
        if (er) throw new Error(er);

        console.log('Block Hash:', value);

        value = value.toString('hex');
        console.log("Block Hash String: ", value);
        var keyString = prefix + hexBlockNumber + value;

        var key = new Buffer(keyString, 'hex');

        db.get(key, function (er, value) {
            if (er) throw new Error(er);

            console.log('Raw Block Data:', value);

            var block = new ethBlock.Header(value);
            console.log(block.toJSON(true));
            var stateRoot = block.stateRoot;
            console.log('State Root:', stateRoot);

            // Check state root in db
            trie.checkRoot(stateRoot);

            var address = '0x0193d941b50d91BE6567c7eE1C0Fe7AF498b4137';
            var hash = utils.sha3(address).toString('hex');
            console.log('Hash key:', hash, hash.length);
            var keyAddress = utils.getNaked(hash);
            trie.getInfoByAddress(stateRoot, keyAddress);
        });
    });
}

test.getCode = function () {
    var contractAddr = "0x621d78f2ef2fd937bfca696cabaf9a779f59b3ed";
    var trueAddr = "0x5cd9f1c602CA78444142568958151027b1334d36";


    setTimeout(function () {

        var dbo = global.dbo;
        dbo.collection("test").insertOne({"1": 1, "2": 2}, function (err, rs) {
            if (err) {
                console.log(err);
            } else {
                console.log(rs);
            }
        })


    }, 5000);

    setTimeout(function () {

        var dbo = global.dbo;
        dbo.collection("test").insertOne({"2": 1, "3": 2}, function (err, rs) {
            if (err) {
                console.log(err);
            } else {
                console.log(rs);
            }
        })


    }, 15000);

    web3.eth.getCode(contractAddr, function (err, rs) {
        if (err) {
            console.log(err);
        } else {
            console.log(rs);
        }
    });

    web3.eth.getBlock(2429065, function (err, rs) {
        if (err) {
            console.log(err);
        } else {
            console.log(rs);
        }
    })

    web3.eth.getBalance("0x28921e4e2c9d84f4c0f0c0ceb991f45751a0fe93", function (err, rs) {
        if (err) {
            console.log(err);
        } else {
            console.log(rs);
            var ethValue = web3.fromWei(rs.toString(10), 'ether');
            console.log(ethValue);
        }
    })

    web3.eth.getBlock(2156894, function (err, rs) {
        console.log(rs);
    })

    web3.eth.getTransaction("0xd94c4b0f6e09c38b6780502268b4fbf70541b3b87fec083deb65ad69a75183e7", function (err, rs) {
        console.log(rs);
    })

    web3.eth.getTransactionReceipt('0xd94c4b0f6e09c38b6780502268b4fbf70541b3b87fec083deb65ad69a75183e7', function (err, rs) {
        console.log(rs);
    })


    web3.eth.getBlock('latest', function (err, rs) {
        console.log("latest block:");
        console.log(rs);
    })
}

test.testDb = function () {
    var dbo = global.dbo;
    dbo.collection("blocks").find().count(function (err, rs) {
        if (err) {
            console.log(err);
        } else {
            console.log(rs);
        }
    })

}


module.exports = test;
