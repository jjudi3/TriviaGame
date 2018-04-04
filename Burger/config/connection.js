var mysql = require('mysql');
var connection = mysql.createConnection({
    host: process.env.db_host || "localhost",
    user: process.env.db_user || "root",
    password: process.env.db_pw || "Star$h1p",
    database: process.env.db || "burgers_db"
});

connection.connect(function (err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});

module.exports = connection;