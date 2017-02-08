/*
    Citations:
    - Followed tutorial from codeforgeek
*/
var express    = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
//    host     : '107.170.249.224',
    host     : 'localhost',
    user     : 'user',
    password : 'cmps183softwareproject',
    database : 'MyDatabase'
});
var app = express();

app.set('port', process.env.PORT || 3000);

//connection.connect();

// Responds with "Connected to the database" on the homepage
app.get('/', function(request, result) {
    result.send('Connected to the database!');
    console.log('Connected to the DB!');
    connection.query('CREATE TABLE users (name varchar(15), username varchar(15), pass varchar(15))');
    connection.query('SELECT * from users', function(err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error! Can\'t connect to the database!\n');
    });
});

app.listen(app.get('port'), function() {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
