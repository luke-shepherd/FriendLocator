
const express = require('express'),
      morgan = require('morgan'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('./config/main');
      database = require('./database');	
      mongoose = require('mongoose');      
      bodyParser = require('body-parser');      
      WebSocket = require('ws');
      url = require('url');
      http = require('http');

//MongoDB stuff
mongoose.connect('mongodb://localhost:27017/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function(){
console.log(db);
});

//Load User model from mongo.js
var User = require('./mongo.js').User;


var app = express();

//Configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());


app.set('port', process.env.PORT || 3000);

var apiRoutes = express.Router(); 
apiRoutes.post('/login', function(req, res){
  console.log("Received name: ", req.body.name);
  console.log("Received password: ", req.body.password);
  
  User.findOne({'name': req.body.name}, function(err,obj){
    if(err) return handleError(err);
    
    console.log("Object received from query: ", obj);
    
    if(!obj){
      res.json({"type": 'response',
                "success": false,
                "reason": 'User does not exist'});
    }else if(req.body.password !== obj.password){
       res.json({"type": 'response',
                 "success": false,
                 "reason": 'Incorrect password'});
    }else{ 
      var token = jwt.sign(user, app.get('superSecret'), {
          expiresInMinutes: 1440 // expires in 24 hours
      });          
      res.json({"type": 'response',
                "success": true,
                "token" : token,
                "reason": "Correct username and password"});
    }
 
  }); 
});

app.use('/api', apiRoutes);

app.get('/', function(req, res){
   res.send("Hi!");
   console.log('REST API');
});

/*Registration route. Catches a x-www-form-urlencoded name and password key using body-parser.
Searched MongoDB for a name with the name key and creates a new User model to be saved into MongoDB. 
*/
app.post('/registration', function(req, res){
   //Store form into DB
   console.log("Received name: ", req.body.name);
   console.log("Received password: ", req.body.password);
   
  User.findOne({'name': req.body.name}, function(err, obj){
    if (err) return handleError(err);
    
    console.log("Object received from query: ", obj);

    if(obj == null){
      var newUser = new User({name : req.body.name, password: req.body.password});
      newUser.save(function (err,obj,numAffected){
        if(err) return handleError(err);
        res.json({"type": 'response',
                  "success": true,});
        console.log('Number of lines affected: ', numAffected);
      });
    }else{
      res.json({"type": 'response',
                "success": false,
                "reason": 'User already exists'});
      console.log('User already exists');
    }
  });

});

/*Route for  logging in.
*/
app.post('/login', function(req, res){
  console.log("Received name: ", req.body.name);
  console.log("Received password: ", req.body.password);
  
  User.findOne({'name': req.body.name}, function(err,obj){
    if(err) return handleError(err);
    
    console.log("Object received from query: ", obj);
    
    if(obj == null){
      res.json({"type": 'response',
                "success": false,
                "reason": 'User does not exist'});
    }else if(req.body.password !== obj.password){
       res.json({"type": 'response',
                 "success": false,
                 "reason": 'Incorrect password'});
    }else{ 
      res.json({"type": 'response',
                "success": true,
                "reason": "Correct username and password"});
    }
 
  }); 
});

/* Route for friend requests.
   Checks if username exists in DB then appends to the user's friends_requests array
*/
app.post('/friendrequest/:username', function(req, res){
   console.log("Requesting friend for: ", req.params.username);
   
   var requesting_user = req.body.name;
   console.log("Requesting user: ", requesting_user);   

   User.findOneAndUpdate({'name': req.params.username, 'friends_request': { $ne: requesting_user}}, {$push: {friends_request: requesting_user}}, {new: true}, function(err, obj){
      if(err) return handleError(err);
      
      if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Friends request array: ", obj.friends_request); 
        res.json({"type": 'response',
                  "success": true});
      }
   });

});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws){
   const location = url.parse(ws.upgradeReq.url, true);
   ws.on('message', function incoming(message){
      console.log('received: %s', message);
   });

   ws.send('something');
});



/* MySQL stuff that we can ignore for now

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
*/

app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + 
   app.get('port') + '; press Ctrl-C to terminate.');
});
