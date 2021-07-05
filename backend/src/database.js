const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notes_app',
    multipleStatements: true
});

connection.connect(function(err) {
    if(err) {
        console.log('error connection');
    }
    else {
        console.log('>> Database is connected to notes_app');
    }
})

module.exports = connection;