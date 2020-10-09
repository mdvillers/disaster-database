const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.deleteIncidentById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM incidents where id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) return next(new CustomError("Cannot delete incidents", 400));
    console.log(result);
    res.json(result);
  });
};
