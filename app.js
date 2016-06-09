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

var sql = require('seriate');

var config = {
  user: process.env.DB_UN,
  password: process.env.DB_PW,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME
};

sql.setDefaultConfig(config);

sql.execute( {
  query: "SELECT EMPFullName FROM dbo.Employee WHERE EMPActive = '1' AND EMPSolution = 'CRM'"
}).then( function( data ) {
  console.log(data);
}, function( err ) {
  console.log( err );
});

// ------- END OF SQL SERVER CONNECTION ------- \\

module.exports = app;
