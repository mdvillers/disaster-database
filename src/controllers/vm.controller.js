const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllvms = (req, res, next) => {
  let sql = `SELECT * FROM VDC_or_Municipality`;
  db.promise()
    .query(sql)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get vm", 400)));
};

exports.insertvm = (req, res, next) => {
  const vm = req.body;
  let sql = `INSERT INTO VDC_or_Municipality SET ?`;
  db.promise()
    .query(sql, vm)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot insert into table", 400)));
};

exports.deletevmById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM VDC_or_Municipality where vmID = ?`;
  db.promise()
    .query(sql, id)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot delete vm", 400)));
};
