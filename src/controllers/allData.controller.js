const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");

exports.allData = (req, res, next) => {
  let sql = `select * from incidents i 
          natural join disastertypes 
          natural join datasources 
          join vms vm 
          on i.locationID = vm.vmID 
          natural join districts 
          left join earthquakes e 
          on i.incidentID = e.earthquakeID 
          left join floods f 
          on i.incidentID = f.floodID 
          left join fires fi 
          on i.incidentID = fi.fireID
          `;
  db.promise()
    .query(sql)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get all Data", 400)));
};
