const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllvms = (req, res, next) => {
  let sql = `SELECT * FROM VDC_or_Municipality`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get vm", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertvm = (req, res, next) => {
  const vm = req.body;
  let sql = `INSERT INTO VDC_or_Municipality SET ?`;
  db.query(sql, vm, (err, result) => {
    if (err)
      return next(new CustomError("Cannot insert into table" + err, 400));
    console.log(result);
    res.json(result);
  });
};

exports.deletevmById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM VDC_or_Municipality where vmID = ?`;
  db.query(sql, id, (err, result) => {
    if (err) return next(new CustomError("Cannot delete vm", 400));
    console.log(result);
    res.json(result);
  });
};
