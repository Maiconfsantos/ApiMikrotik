var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'user',
    password: 'pass',
    database: 'database'
})

connection.connect();

module.exports = connection;