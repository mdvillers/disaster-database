const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDistricts = (req, res, next) => {
  let sql = `SELECT * FROM District`;
  db.promise()
    .query(sql)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get District", 400)));
};

exports.insertDistrict = (req, res, next) => {
  const district = req.body;
  let sql = `INSERT INTO District SET ?`;
  db.promise()
    .query(sql, district)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot insert into table", 400)));
};

exports.deleteDistrictByName = (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  let sql = `DELETE FROM District where districtName = ?`;
  db.promise()
    .query(sql, name)
    .then((result) => res.json(result[0]))
    .catch((err) => next(new CustomError("Cannot delete District" + err, 400)));
};
