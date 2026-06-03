const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "pitchbooker"
});

connection.connect((err) => {

    if(err){
        console.log("Database Error ❌");
        console.log(err);
    }
    else{
        console.log("MySQL Connected ✅");
    }

});

module.exports = connection;