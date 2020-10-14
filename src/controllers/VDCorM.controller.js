const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllVDCorMs = (req, res, next) => {
  let sql = `SELECT * FROM VDC_or_Municipality`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get VDCorM", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertVDCorM = (req, res, next) => {
  const VDCorM = req.body;
  let sql = `INSERT INTO VDC_or_Municipality SET ?`;
  db.query(sql, VDCorM, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteVDCorMById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM VDC_or_Municipality where id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) return next(new CustomError("Cannot delete VDCorM", 400));
    console.log(result);
    res.json(result);
  });
};
