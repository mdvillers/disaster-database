const mysql = require("mysql2");
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

db.promise()
  .connect()
  .then(console.log(`MySQL connection established`))
  .catch((err) => console.log(err));

exports.db = db;
