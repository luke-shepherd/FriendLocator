/*
    Citations:
    - Followed tutorial from codeforgeek
*/
var express    = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '107.170.249.224',
    user     : 'admin',
    password : 'cmps183softwareproject',
    database : 'MyDatabase'
});
var app = express();

connection.connect();

// Responds with "Connected to the database" on the homepage
app.get('/', function(request, result) {
    result.send('Connected to the database!');
    connection.query('CREATE TABLE users (name varchar(15), username varchar(15), pass varchar(15))');
    connection.query('SELECT * from users', function(err, rows, fields) {
        connection.end();
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error!');
        });
    }
);

app.listen(3000);