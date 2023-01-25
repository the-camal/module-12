const mysql = require("mysql2");
const connection = mysql.createconnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "worker"
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;
