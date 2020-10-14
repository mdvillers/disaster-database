const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllIncidents = (req, res, next) => {
  let sql = `SELECT * FROM Incident`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get Incident", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertIncident = (req, res, next) => {
  const incident = req.body;
  let sql = `INSERT INTO Incident SET ?`;
  db.query(sql, incident, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteIncidentById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM Incident where id = ?`;
  db.query(sql, id, (err, result) => {
    if (err) return next(new CustomError("Cannot delete Incident", 400));
    console.log(result);
    res.json(result);
  });
};
