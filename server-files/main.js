// Load the http Node.js module and store the returned instance into http
var http = require("http");

// Use the created http instance and create a server instance
http.createServer(function(request, response) {
   // Send the HTTP header
   // HTTP Status: 200: OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});

   // Always return "Hello World"
   response.end('Successfully made a request to the server\n');

// Bind the server instance at port 8081 and pass it a function with the request and response parameters
}).listen(8081);

console.log('Server running at http://107.170.249.224:8081/');
