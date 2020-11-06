const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.getAllDataSources = (req, res, next) => {
  let sql = `SELECT * FROM DataSource`;
  db.promise()
    .query(sql)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get DataSource", 400)));
};

exports.insertDataSource = (req, res, next) => {
  const dataSource = req.body;
  let sql = `INSERT INTO DataSource SET ?`;

  db.promise()
    .query(sql, dataSource)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot insert into table", 400)));
};

exports.deleteDataSourceBySourceId = (req, res, next) => {
  const { sourceId } = req.params;
  let sql = `DELETE FROM DataSource where sourceID = ?`;
  db.promise()
    .query(sql, sourceId)
    .then((result) => res.json(result[0]))
    .catch((err) => next(new CustomError("Cannot delete DataSource", 400)));
};
