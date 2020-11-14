const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");
const fs = require("fs");
const path = require("path");

const createQueries = fs
  .readFileSync(path.join(__dirname, "../disaster.sql"))
  .toString()
  .replace(/(\r\n|\n|\r)/gm, " ") // remove newlines
  .replace(/\s+/g, " ") // excess white space
  .split(";") // split into all statements
  .map(Function.prototype.call, String.prototype.trim)
  .filter(function (el) {
    return el.length != 0;
  }); // remove any empty ones

exports.createDatabase = (req, res, next) => {
  db.query(`CREATE DATABASE IF NOT EXISTS disaster`, (err, result) => {
    if (err) {
      return next(CustomError(err.message, 500));
    }
  });
  res.json({ message: "created disaster database successfully" });
};

exports.createTables = (req, res, next) => {
  db.beginTransaction((err) => {
    if (err) return next(new CustomError(err.message, 400));

    createQueries.forEach((createQuery) => {
      db.query(createQuery, (err, result) => {
        if (err) {
          return db.rollback(() => {
            console.log(err);
          });
        }
      });
    });
    res.send({ message: "tables created successfully" });
  });
};
