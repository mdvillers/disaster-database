const mysql = require("mysql");
const { host, user, password } = process.env;
let mysqlConfig = {
  host,
  user,
  password,
  database: "disaster_test", //COMMENT THIS AND CREATE DATABASE FOR USING FIRST TIME
};

const db = mysql.createConnection(mysqlConfig);

//Connect
db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connection started successfully...");
});

exports.db = db;
