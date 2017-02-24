
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
   console.log("Received name: ", req.body.user);
   console.log("Received password: ", req.body.pass);
   
  User.findOne({'name': req.body.user}, function(err, obj){
    if (err) return handleError(err);
    
    console.log("Object received from query: ", obj);

    if(!obj){
      var newUser = new User({name : req.body.user, password: req.body.pass});
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
         res.json({"type": "response",
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
   var requesting_user = req.body.name;
   console.log("Requesting user: ", requesting_user);  
   console.log("Requesting friend for: ", req.params.username);   

   User.findOneAndUpdate({'name': req.params.username,
			  'friends_request': { $ne: requesting_user}},
			   {$push: {friends_request: requesting_user}},
			   {new: true}, function(err, obj){
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

//Accept friend request route
apiRoutes.post('/friendrequest/accept/:username', function(req, res){
   var requesting_user = req.body.name;
   console.log("Requesting user: ", requesting_user);  
   console.log("Requesting friend for: ", req.params.username);   
   
   //Update friends list of requesting user
   User.findOneAndUpdate({'name': requesting_user},
               {$pull: {friends_request: req.params.username},
			   {$push: {friends_list: req.params.username}},
			   {new: true}, function(err, obj){
      if(err) return handleError(err);
      
      if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Requesting user object: ", obj); 
        console.log("Friends request array: ", obj.friends_request); 
      }
   });
   
   //Update friends list of friend
   User.findOneAndUpdate({'name': req.params.username},
			   {$push: {friends_list: requesting_user}},
			   {new: true}, function(err, obj){
      if(err) return handleError(err);
      
      if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Friend object: ", obj); 
        console.log("Friends request array: ", obj.friends_request); 
        res.json({"type": 'response',
                  "success": true});
      }
   });
   
});

//Reject friend request route
apiRoutes.post('/friendrequest/reject/:username', function(req, res){
   var requesting_user = req.body.name;
   console.log("Requesting user: ", requesting_user);  
   console.log("Requesting friend for: ", req.params.username);   

   //Update friends request of requesting user
    User.findOneAndUpdate({'name': requesting_user},
               {$pull: {friends_request: req.params.username},
			   {new: true}, function(err, obj){
      if(err) return handleError(err);
      
      if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Requesting user object: ", obj); 
        console.log("Friends request array: ", obj.friends_request); 
      }
   });
   
   var reject_notification = requesting_user + "has rejected your friend request";
   console.log("Reject notification:", reject_notifcation);
   
    //Update notifications list of friend
   User.findOneAndUpdate({'name': req.params.username},
			   {$push: {notifications: reject_notifcation}},
			   {new: true}, function(err, obj){
      if(err) return handleError(err);
      
      if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Friend object: ", obj); 
        console.log("Notifications: ", obj.notifications); 
        res.json({"type": 'response',
                  "success": true});
      }
   });
   
});

//Delete friend for both users route
apiRoutes.post('/friendpage/delete/:username', function(req, res){
    var requesting_user = req.body.name;
    console.log("Requesting user: ", requesting_user);
    console.log("Delete user: ", req.params.username);
    
    //Update friends list of requesting user
    User.findOneAndUpdate({'name':requesting_user},
                            {$pull: {friends_list: req.params.username}},
                            {new: true}, function(err, obj){
          if(err) return handleError(err);
          
          if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
        console.log("Requesting user object: ", obj);
        console.log("Friends list array: ", obj.friends_list); 
      }
   });
   
   //Update friends list of friend
   User.findOneAndUpdate({'name':req.params.username},
                            {$pull: {friends_list: requesting_user}},
                            {new: true}, function(err, obj){
          if(err) return handleError(err);
          
          if(obj == null){
         res.json({"type": 'response',
                   "success": false,
                   "reason": 'User does not exist'});
      }else{
         console.log("Friend object: ", obj); 
        console.log("Friends list array: ", obj.friends_list); 
        res.json({"type": 'response',
                  "success": true});
      }
   });   

});

//General friend page route
apiRoutes.post('/friendpage/', function(req, res){
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

//Groups page route
apiRoutes.post('/grouppage/', function(req, res){
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

//Create group route
apiRoutes.post('/grouppage/create/:name', function(req, res){
    var requesting_user = req.body.name;
    console.log("Requesting user: ", requesting_user);
    
    User.findOneAndUpdate({'name': req.params.username,
			   {$push: {groups: req.params.name}},
			   {new: true}, function(err, obj){
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

//Delete group route

//Add friends to a group route

//Delete friends from a group route

//Send location to people in group route

//Upload profile pic route


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
