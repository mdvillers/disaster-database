const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.createDatabase = (req, res, next) => {
  let sql = "CREATE DATABASE disaster_test";
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError(err.message, 400));
    console.log(result);
    res.send({ message: "database created successfully" });
  });
};

exports.createTable = (req, res, next) => {
  let sql = `CREATE TABLE incidents(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      disasterTypeName VARCHAR(255) NOT NULL,
      disasterDate DATETIME NOT NULL,
      district VARCHAR(30) NOT NULL
    )`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError(err.message, 400));
    console.log(result);
    res.send({ message: "table created successfully" });
  });
};
