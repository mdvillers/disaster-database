const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.insertIncident = (req, res, next) => {
  const incident = req.body;
  let sql = `INSERT INTO incidents SET ?`;
  db.query(sql, incident, (err, result) => {
    if (err)return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};
