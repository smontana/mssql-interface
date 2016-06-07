var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
// var Statements = require('./lib/sql-statements');

var config = {
  server: process.env.DB_SERVER,
  userName: process.env.DB_UN,
  password: process.env.DB_PW,

  option: {
    database: process.env.DB_NAME
    // encrypt: true ----for Azure users
  }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
  // If no error, then good to go...
  if (err) {
    throw err;
  } else {
    // executeStatement();
    console.log('ALL GOOD!');
  }
});