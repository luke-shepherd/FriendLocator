
//Get the packages that we need =============
//==========================================
const express = require('express'),
      morgan = require('morgan'),
      passport = require('passport'),
      jwt = require('jsonwebtoken'),
      config = require('./config');
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
app.set('superSecret', config.secret);

//Configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 8080);


//API ROUTES =================================================================
//============================================================================

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

    if(!obj){
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


var apiRoutes = express.Router(); 

//Login route 
apiRoutes.post('/login', function(req,res){
   console.log("Received name: ", req.body.name);
   console.log("Received password: ", req.body.password);
   User.findOne({'name': req.body.name}, function(err,obj){
     if(err) return handleError(err);
     console.log("Object received from query: ", obj);
     if(!obj){
        res.json({"type": 'response',
                  "success": false,
                  "reason": 'User does not exist!'});
     }else if(req.body.password !== obj.password){
        res.json({"type": 'response',
                  "success": false,
                  "reason": 'Incorrect password'});
     }else{
         var token = jwt.sign(obj, app.get('superSecret'), {
                expiresIn: 60*24 // expires in 24 hours
         });
         obj.token = token;
         res.json({"type": 'response',
                    "success": true,
                    "token" : token,
                    "reason": 'Correct username and password'});
         console.log("Object after adding token: ", obj);         
     }
   });
});

//Middleware to verify incoming JWT token
apiRoutes.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    
    if(token){
       jwt.verify(token, app.get('superSecret'), function(err, decoded){
          if(err){
            return res.json({"type": 'response',
                             "success": false,
                             "reason": 'Failed to authenticate'});
          }else{
             req.decoded = decoded;
             next();
          }
       });
    }else{
      return  res.status(403).send({"type": 'resopnse',
                                    "success": false,
                                    "reason": 'No token provided'});
    }
});

//Friend request route
apiRoutes.post('/friendrequest/:username', function(req, res){
   console.log("Requesting friend for: ", req.params.username);
   console.log("Request decoded token: ", req.decoded);    
   User.findOne({'token': req.decoded}, function(err, obj){
       if(err) return handleError(err);
       console.log("Object received from query: ", obj);
       if(!obj){
        res.json({"type": 'response',
                  "success": false,
                  "reason": 'Invalid token'});
       }else{
          var requesting_user = obj.name;
          console.log("Requesting user: ", requesting_user);    
       }             
   });
   

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

//Friend page route
apiRoutes.get('/friendpage/', function(req, res){
    var requesting_user = req.body.name;
    console.log("Requesting user: ", requesting_user);
    
    User.findOne({'name': req.body.name}, function(err,obj){
        if(err) return handleError(err);
    
        console.log("Object received from query: ", obj);
    
        if(obj == null){
            res.json({"type": 'response',
                "success": false,
                "reason": 'Error: User does not exist'});
        }else{ 
            res.json({"type": 'response',
                "success": true,
                "friends_request": obj.friends_request,
                "friends": obj.friends_list});
        }
 
    }); 

});

//To do: Accept friend request route

//To do: Reject friend request route


app.use('/api', apiRoutes);





/*
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws){
   const location = url.parse(ws.upgradeReq.url, true);
   ws.on('message', function incoming(message){
      console.log('received: %s', message);
   });

   ws.send('something');
});
*/


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

//Start the server==============================================
//==============================================================

app.listen(app.get('port'), function(){
   console.log('Express started on http://localhost:' + 
   app.get('port') + '; press Ctrl-C to terminate.');
});
