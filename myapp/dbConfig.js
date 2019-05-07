'use strict'

var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : '11111111',
    database : 'employees'
});

function dbConfig() {};

dbConfig.prototype.fetchData = function(query, callback) {
    // connection.connect(function(err){
        //if(!err) {
            console.log("Database is connected ...");
            connection.query(query, function (error, result, fields) {
                if (error) {
                    throw error;
                }
                console.log(result);
                callback(result);
            })
        //}
        // } else {
        //     console.log("Error connecting database ..." + JSON.stringify(err));
        // }
    // });
};

module.exports = dbConfig;