const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDisasterTypes = (req, res, next) => {
  let sql = `SELECT * FROM DisasterType`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get DisasterType", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertDisasterType = (req, res, next) => {
  const disasterType = req.body;
  let sql = `INSERT INTO DisasterType SET ?`;
  db.query(sql, disasterType, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteDisasterTypeByName = (req, res, next) => {
  const { name } = req.params;
  let sql = `DELETE FROM DisasterType where disasterTypeName = ?`;
  db.query(sql, name, (err, result) => {
    if (err) return next(new CustomError("Cannot delete DisasterType", 400));
    console.log(result);
    res.json(result);
  });
};
