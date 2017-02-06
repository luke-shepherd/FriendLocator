/*
    Citations:
    - https://www.tutorialspoint.com/nodejs/nodejs_express_framework.htm
*/
var express      = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(express.static('public'));
app.use(cookieParser())

app.get('/index.html', function(request, result) {
    result.sendFile(__dirname + "/" + "index.htm");
})

// Return all cookies sent by the client
app.get('/', function(request, result) {
    console.log("Cookies: ", request.cookies)
})

// Responds to a GET request for the homepage
app.get('/get_info', function(request, result) {
    // Output the results in JSON format
    response = {
        name: req.query.name,
        username: req.query.username,
        pass: req.query.pass
    };
    console.log(response);
    result.end(JSON.stringify(response));
})

// Responds to a POST request for the homepage
app.post('/', function(request, result) {
    console.log("Received a POST request from the homepage");
    result.send('POST');
})

// Responds to a DELETE request for the /deleteUser page
app.dlete('/deleteUser', function(request, result) {
    console.log("Received a DELETE request from the /deleteUser page");
    result.send('DELETE');
})

// Responds to a GET request for the /allUsers page
app.get('/allUsers', function(request, result) {
    console.log("Received a GET request from the /allUsers page");
    result.send('GET for /allUsers');
})

// Responds to a GET request for the /userExample page
app.get('/userExample', function(request, result) {
    console.log("Received a GET request from the /userExample page");
    result.send('GET for /userExample');
})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    
    console.log('Currently listening at http://%s:%s', host, port)
})