var path = require('path');
var levelup = require('levelup');
var leveldown = require('leveldown');
var DB_DIR = "E:\\Ethereum\\geth\\chaindata";

/**
 * Level DB
 */
var db = levelup(leveldown(DB_DIR));


/**
 * Global variable
 */
global.db = db;
