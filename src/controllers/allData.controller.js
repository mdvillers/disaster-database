const { db } = require("../connectdb");

exports.allData = (req, res, next) => {
  let sql = `select * from Incident i 
  natural join DisasterType natural join DataSource join VDC_or_Municipality vm on i.locationID=vm.vmID natural join District left join Earthquake e on i.incidentID=e.earthquakeID left join Flood f on i.incidentID=f.floodID left join Fire fi on i.incidentID=fi.fireID`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get District", 400));
    console.log(result);
    res.json(result);
  });
};
