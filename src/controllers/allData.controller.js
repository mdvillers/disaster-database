const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.allData = (req, res, next) => {
  let sql = `select * from Incident i 
          natural join DisasterType 
          natural join DataSource 
          join VDC_or_Municipality vm 
          on i.locationID = vm.vmID 
          natural join District 
          left join Earthquake e 
          on i.incidentID = e.earthquakeID 
          left join Flood f 
          on i.incidentID = f.floodID 
          left join Fire fi 
          on i.incidentID = fi.fireID
          `;
  db.promise()
    .query(sql)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get all Data", 400)));
};
