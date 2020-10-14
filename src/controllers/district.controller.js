const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDistricts = (req, res, next) => {
  let sql = `SELECT * FROM District`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get District", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertDistrict = (req, res, next) => {
  const incident = req.body;
  let sql = `INSERT INTO District SET ?`;
  db.query(sql, incident, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteDistrictByName = (req, res, next) => {
  const { name } = req.params;
  let sql = `DELETE FROM District where District_Name = ?`;
  db.query(sql, name, (err, result) => {
    if (err) return next(new CustomError("Cannot delete District", 400));
    console.log(result);
    res.json(result);
  });
};
