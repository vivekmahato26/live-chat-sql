const mysql = require("mysql2");


// creteConnection same paraments - Only difference reconnect to DB after each query/operation 
const client = mysql.createPool({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "qwerty123",
    database: "live_chat",
    connectTimeout: 30000,
    waitForConnections: true
})

// client.query("SQL QUERY", (err,rows,fileds) => {

// })

const sqlPromise = client.promise();
// const [rows,fields] = await sqlPromise.query("SQL QUERY")

module.exports = sqlPromise;
