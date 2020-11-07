const { db } = require("../connectdb");
const {
  INCIDENT_KEYS,
  FLOOD_KEYS,
  EARTHQUAKE_KEYS,
  FIRE_KEYS,
} = require("../constants/KEYS");
const CustomError = require("../error/CustomError");

let joinsql = `natural join DisasterType 
              natural join DataSource 
              join VDC_or_Municipality vm 
              on i.locationID = vm.vmID 
              natural join District`;

const disasterTypes = ["Flood", "Earthquake", "Fire"];

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

const getObjectWithKeysInArray = (arr, object) =>
  arr.reduce((obj, key) => {
    if (key in object) {
      obj[`${key}`] = object[`${key}`];
    }
    return obj;
  }, {});

exports.getAllIncidents = (req, res, next) => {
  let sql;
  let { type } = req.params;
  if (type) type = type.toLowerCase();
  if (!disasterTypes.includes(type && type.capitalize()))
    sql = `SELECT * FROM Incident i ${joinsql}`;
  else
    sql = `SELECT * FROM ${type.capitalize()} x join Incident i on i.incidentID=x.${type}ID ${joinsql}`;

  db.promise()
    .query(sql)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get Incident", 400)));
};

exports.insertIncident = (req, res, next) => {
  const incidentDetails = req.body;

  const incident = getObjectWithKeysInArray(INCIDENT_KEYS, incidentDetails);

  let incidentSql = `INSERT INTO Incident SET ?`;

  const { disasterTypeName } = incident;

  //insert into incident table first
  db.promise()
    .query(incidentSql, incident)
    .then((result) => {
      let incidentID, otherSql;
      incidentID = result[0].insertId;

      const otherDetails = getObjectWithKeysInArray(
        eval(`${disasterTypeName}_KEYS`.toUpperCase()),
        incidentDetails
      );

      //make suitable sql commands to enter into respective disasterType
      if (disasterTypes.includes(disasterTypeName)) {
        otherDetails[`${disasterTypeName.toLowerCase()}ID`] = incidentID;
        otherSql = `INSERT INTO ${disasterTypeName} SET ?`;
      } else {
        return next(new CustomError("Invalid disaster typename", 404));
      }

      //Insert into respective disasterType
      db.promise()
        .query(otherSql, otherDetails)
        .then((result) => {
          console.log(result[0]);
        })
        .catch((err) => next(new CustomError("Cannot get Incident", 400)));
    })
    .catch((err) => next(new CustomError("Cannot insert incident", 400)));

  res.json({ message: "Incident created successfully" });
};

exports.updateIncidentById = (req, res, next) => {
  const {
    body: incidentDetails,
    params: { id },
  } = req;

  const incident = getObjectWithKeysInArray(INCIDENT_KEYS, incidentDetails);

  db.promise()
    .query(`SELECT disasterTypeName FROM Incident WHERE incidentID = ? `, id)
    .then((result) => {
      console.log(result[0]);
      disasterTypeName = result[0][0].disasterTypeName;

      const otherDetails = getObjectWithKeysInArray(
        eval(`${disasterTypeName}_KEYS`.toUpperCase()),
        incidentDetails
      );

      let sql =
        Object.keys(incident).length > 0
          ? `UPDATE Incident SET ? WHERE incidentID = ?`
          : `SELECT * FROM DataSource LIMIT 1`;

      db.promise()
        .query(sql, [incident, id])
        .then((result) => {
          console.log(result[0]);

          sql =
            Object.keys(otherDetails).length > 0
              ? `UPDATE ${disasterTypeName} SET ? WHERE ${disasterTypeName.toLowerCase()}ID = ?`
              : `SELECT * FROM DataSource LIMIT 1`; //any valid query

          db.promise()
            .query(sql, [otherDetails, id])
            .then((result) => {
              res.json({ message: "updated" });
            })
            .catch((err) =>
              next(
                new CustomError(`Cannot Update ${disasterTypeName}` + err, 400)
              )
            );
        })
        .catch((err) =>
          next(new CustomError("Cannot Update Incident" + err, 400))
        );
    })
    .catch((err) =>
      next(new CustomError("Cannot get disaster type name " + err, 400))
    );
};

exports.deleteIncidentById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM Incident where incidentID = ?`;
  db.promise()
    .query(sql, id)
    .then((result) => {
      console.log(result[0]);
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot delete Incident", 400)));
};
