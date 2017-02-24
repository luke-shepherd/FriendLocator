const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      mysql = require('mysql');
      config = require('./config/main');
      database = require('./database');	


var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
   res.send("Hi!");
   console.log('REST API');
});

app.post('/test', function(req, res){
   console.log(req);
   res.send({"name":"Brian", "age":21});
});

var connection = mysql.createConnection({
   host    : 'localhost',
   user    : 'production',
   password : 'adultfriendlocator',
   database  : 'production_database'
});

connection.connect(function(err){
   if(err){
     console.error('Error connection: ' + err.stack);
     return;
   }
   console.log('connected as id ' + connection.threadId);
});


app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + 
   app.get('port') + '; press Ctrl-C to terminate.');
});
