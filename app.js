require('dotenv').load();
var express = require('express');
var app = express();

require('./lib/logging')(app);
require('./lib/request_parsing')(app);
require('./lib/static')(app);
require('./lib/views')(app);

// require('./lib/routing')(app, connection);
require('./lib/routing')(app);
require('./lib/errors')(app); // error handles must load after app routes

// ------- START OF SQL SERVER CONNECTION ------- \\

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

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
  if (err) {
    throw err;
  } else {
    // executeStatement();
    console.log('ALL GOOD!');
  }
});

// ------- END OF SQL SERVER CONNECTION ------- \\

module.exports = app;
