const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllvms = (req, res, next) => {
  let sql = `SELECT * FROM vms`;
  db.promise()
    .query(sql)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get vm", 400)));
};

exports.getVmsByDistrictName = (req, res, next) => {
  const { name } = req.params;
  let sql = `SELECT * FROM vms where districtName = ?`;
  db.promise()
    .query(sql, name)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get vm", 400)));
};

exports.insertvm = (req, res, next) => {
  const vm = req.body;
  let sql = `INSERT INTO vms SET ?`;
  db.promise()
    .query(sql, vm)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot insert into table", 400)));
};

exports.deletevmById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM vms where vmID = ?`;
  db.promise()
    .query(sql, id)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot delete vm", 400)));
};
