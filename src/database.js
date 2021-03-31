const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'instancia1.c0amdwfyzsrn.us-east-1.rds.amazonaws.com',
    user: 'root',
    password: '123456789',
    database: 'company',

})

mysqlConnection.connect(function(err) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
})

module.exports = mysqlConnection;