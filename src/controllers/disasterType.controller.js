const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDisasterTypes = (req, res, next) => {
  let sql = `SELECT * FROM disastertypes`;
  db.promise()
    .query(sql)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get disastertypes", 400)));
};

exports.insertDisasterType = (req, res, next) => {
  const disasterType = req.body;
  let sql = `INSERT INTO disastertypes SET ?`;
  db.promise()
    .query(sql, disasterType)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) =>
      next(new CustomError("Cannot insert into Disaster type", 400))
    );
};

exports.deleteDisasterTypeByName = (req, res, next) => {
  const { name } = req.params;
  let sql = `DELETE FROM disastertypes where disasterTypeName = ?`;
  db.promise()
    .query(sql, name)
    .then((result) => res.json(result[0]))
    .catch((err) => next(new CustomError("Cannot delete disastertypes", 400)));
};
