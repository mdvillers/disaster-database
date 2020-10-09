const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllIncidents = (req, res, next) => {
  let sql = `SELECT * FROM incidents`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get incidents", 400));
    console.log(result);
    res.json(result);
  });
};
