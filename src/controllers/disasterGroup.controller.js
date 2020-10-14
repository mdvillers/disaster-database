const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDisasterGroups = (req, res, next) => {
  let sql = `SELECT * FROM DisasterGroup`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get DisasterGroup", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertDisasterGroup = (req, res, next) => {
  const disasterGroup = req.body;
  let sql = `INSERT INTO DisasterGroup SET ?`;
  db.query(sql, disasterGroup, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteDisasterGroupByName = (req, res, next) => {
  const { name } = req.params;
  let sql = `DELETE FROM DisasterGroup where disasterGroupName = ?`;
  db.query(sql, name, (err, result) => {
    if (err) return next(new CustomError("Cannot delete DisasterGroup", 400));
    console.log(result);
    res.json(result);
  });
};
