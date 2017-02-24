var mysql = require('mysql');
var connection = mysql.createConnection({
	host	: 'localhost',
	user	: 'production',
	password: 'adultfriendlocator',
	database: 'production_database'
});

connection.connect();
