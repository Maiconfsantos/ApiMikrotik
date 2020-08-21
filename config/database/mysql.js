var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'maicon',
    password: 'A130099821',
    database: 'mikronode'
})

connection.connect();

module.exports = connection;