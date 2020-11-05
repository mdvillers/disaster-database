const { db } = require("../connectdb");

exports.allData = (req, res, next) => {
  let sql = `SELECT * FROM ((Incident natural join (VDC_or_Municipality natural join District)) natural join DisasterType)`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get District", 400));
    console.log(result);
    res.json(result);
  });
};
