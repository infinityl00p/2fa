const mysql = require("mysql");

const connection = mysql.createConnection({
  hostname: "localhost",
  port: 3306,
  user: "user",
  password: "password",
  database: "2fa-db",
});

const dbConnect = function () {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
  });
};

module.exports = {
  dbConnect,
  connection,
};
