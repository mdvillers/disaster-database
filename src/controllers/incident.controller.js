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
  const {
    incidentDate,
    totalDeath,
    missingPeople,
    affectedFamily,
    estimatedLoss,
    injured,
    propertyLoss,
    damagedHouses,
    disasterTypeName,
    locationID,
    sourceID,
    ...otherDetails
  } = req.body;

  const incident = {
    incidentDate,
    totalDeath,
    missingPeople,
    affectedFamily,
    estimatedLoss,
    injured,
    propertyLoss,
    damagedHouses,
    disasterTypeName,
    locationID,
    sourceID,
  };

  let incidentSql = `INSERT INTO Incident SET ?`;

  //insert into incident table first
  db.query(incidentSql, incident, (err, result) => {
    let incidentID, otherSql;
    if (err) console.log(err);
    incidentID = result.insertId;
    console.log(result);

    //make suitable sql commands to enter into respective disasterType
    if (disasterTypeName === "Flood") {
      otherDetails.floodID = incidentID;
      otherSql = "INSERT INTO Flood SET ?";
    } else if (disasterTypeName === "Earthquake") {
      otherDetails.earthquakeID = incidentID;
      otherSql = "INSERT INTO Earthquake SET ?";
    } else if (disasterTypeName === "Fire") {
      otherDetails.fireID = incidentID;
      otherSql = "INSERT INTO Fire SET ?";
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

exports.getAllFireIncidents = (req, res, next) => {
  let sql = `SELECT * FROM Fire f join Incident i on i.incidentID=f.fireID `;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get Fire Incident", 400));
    console.log(result);
    res.json(result);
  });
};
exports.getAllFloodIncidents = (req, res, next) => {
  let sql = `SELECT * FROM Flood f join Incident i on i.incidentID=f.floodID `;
  db.query(sql, (err, result) => {
    if (err) return next(new CustomError("Cannot get Flood Incident", 400));
    console.log(result);
    res.json(result);
  });
};
exports.getAllEarthquakeIncidents = (req, res, next) => {
  let sql = `SELECT * FROM Earthquake e join Incident i on i.incidentID=e.earthquakeID `;
  db.query(sql, (err, result) => {
    if (err)
      return next(new CustomError("Cannot get Earthquake Incident", 400));
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
