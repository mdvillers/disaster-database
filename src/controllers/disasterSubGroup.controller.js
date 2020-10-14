const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDisasterSubGroups = (req, res, next) => {
  let sql = `SELECT * FROM DisasterSubGroup`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get DisasterSubGroup", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertDisasterSubGroup = (req, res, next) => {
  const disasterSubGroup = req.body;
  let sql = `INSERT INTO DisasterSubGroup SET ?`;
  db.query(sql, disasterSubGroup, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteDisasterSubGroupByName = (req, res, next) => {
  const { name } = req.params;
  let sql = `DELETE FROM DisasterSubGroup where DisasterSubGroupName = ?`;
  db.query(sql, name, (err, result) => {
    if (err)
      return next(new CustomError("Cannot delete DisasterSubGroup", 400));
    console.log(result);
    res.json(result);
  });
};
