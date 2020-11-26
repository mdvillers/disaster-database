const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDistricts = (req, res, next) => {
  let sql = `SELECT * FROM districts`;
  db.promise()
    .query(sql)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get districts", 400)));
};

exports.insertDistrict = (req, res, next) => {
  const district = req.body;
  let sql = `INSERT INTO districts SET ?`;
  db.promise()
    .query(sql, district)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot insert into table", 400)));
};

exports.deleteDistrictByName = (req, res, next) => {
  const { name } = req.params;
  let sql = `DELETE FROM districts where districtName = ?`;
  db.promise()
    .query(sql, name)
    .then((result) => res.json(result[0]))
    .catch((err) =>
      next(new CustomError("Cannot delete districts" + err, 400))
    );
};
