const mysql = require("mysql");
const {
  RDS_HOSTNAME: host,
  RDS_USERNAME: user,
  RDS_PASSWORD: password,
  RDS_DATABASE: database,
  RDS_PORT: port,
} = process.env;

let mysqlConfig = {
  host,
  user,
  password,
  database,
  port,
};

const db = mysql.createConnection(mysqlConfig);

//Connect
db.connect((err) => {
  if (err) throw err;
  console.log("Mysql connection started successfully...");
});

exports.db = db;
