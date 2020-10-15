const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDataSources = (req, res, next) => {
  let sql = `SELECT * FROM DataSource`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get DataSource", 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertDataSource = (req, res, next) => {
  const dataSource = req.body;
  let sql = `INSERT INTO DataSource SET ?`;
  db.query(sql, dataSource, (err, result) => {
    if (err) return next(new CustomError("Cannot insert into table", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteDataSourceBySourceId = (req, res, next) => {
  const { sourceId } = req.params;
  let sql = `DELETE FROM DataSource where sourceId = ?`;
  db.query(sql, sourceId, (err, result) => {
    if (err) return next(new CustomError("Cannot delete DataSource", 400));
    console.log(result);
    res.json(result);
  });
};
