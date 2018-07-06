var Web3 = require('web3');
const LOCAL_RPC_URL = "http://localhost:8545";
var web3 = new Web3(new Web3.providers.HttpProvider(LOCAL_RPC_URL));

console.log(2);
console.log("\n===========================================");
console.log("========== Geth connected:", web3.isConnected(), "===========");
console.log("===========================================\n");

var Geth = function () {}

Geth.getBlock = function (blockNumber) {
    return console.log('blockData:', web3.eth.getBlock(blockNumber));
}

Geth.getStateRoot = function (blockNumber) {
    return console.log('stateRoot:', web3.eth.getBlock(blockNumber).stateRoot);
}

module.exports = Geth
