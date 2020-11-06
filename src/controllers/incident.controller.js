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
  type = type.toLowerCase();
  if (!disasterTypes.includes(type.capitalize()))
    sql = `SELECT * FROM Incident i ${joinsql}`;
  else
    sql = `SELECT * FROM ${type.capitalize()} x join Incident i on i.incidentID=x.${type}ID ${joinsql}`;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get Incident" + err, 400));
    console.log(result);
    res.json(result);
  });
};

exports.insertIncident = (req, res, next) => {
  const incidentDetails = req.body;

  const incident = getObjectWithKeysInArray(INCIDENT_KEYS, incidentDetails);
  const otherDetails = getObjectWithKeysInArray(
    [...FIRE_KEYS, ...EARTHQUAKE_KEYS, ...FLOOD_KEYS],
    incidentDetails
  );

  let incidentSql = `INSERT INTO Incident SET ?`;

  const { disasterTypeName } = incident;

  //insert into incident table first
  db.query(incidentSql, incident, (err, result) => {
    let incidentID, otherSql;
    if (err) console.log(err);
    incidentID = result.insertId;
    console.log(result);

    //make suitable sql commands to enter into respective disasterType
    if (disasterTypes.includes(disasterTypeName)) {
      otherDetails[`${disasterTypeName.toLowerCase()}ID`] = incidentID;
      otherSql = `INSERT INTO ${disasterTypeName} SET ?`;
    } else {
      return next(new CustomError("Invalid disaster typename", 404));
    }

    //Insert into respective disasterType
    db.query(otherSql, otherDetails, (err, result) => {
      if (err) console.log(err);
      console.log(result);
    });
  });

  res.json({ message: "Incident created successfully" });
};

exports.updateIncidentById = (req, res, next) => {
  const {
    body: incident,
    params: { id },
  } = req;

  let sql = `UPDATE Incident SET ? WHERE incidentID = ?`;
  db.query(sql, [incident, id], (err, result) => {
    if (err) return next(new CustomError("Cannot Update Incident", 400));
    console.log(result);
    res.json(result);
  });
};

exports.deleteIncidentById = (req, res, next) => {
  const { id } = req.params;
  let sql = `DELETE FROM Incident where incidentID = ?`;
  db.query(sql, id, (err, result) => {
    if (err) return next(new CustomError("Cannot delete Incident", 400));
    console.log(result);
    res.json(result);
  });
};
