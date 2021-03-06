const { db } = require("../connectdb");
const {
  INCIDENT_KEYS,
  FLOOD_KEYS,
  EARTHQUAKE_KEYS,
  FIRE_KEYS,
} = require("../constants/KEYS");
const fs = require("fs");
const CustomError = require("../error/CustomError");

let joinsql = `natural join disastertypes 
              natural join datasources 
              join vms vm 
              on i.locationID = vm.vmID 
              natural join districts`;

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
  if (!type) sql = `SELECT * FROM incidents i ${joinsql}`;
  else if (disasterTypes.includes(type.capitalize()))
    sql = `SELECT * FROM ${type}s x join incidents i on i.incidentID=x.${type}ID ${joinsql}`;
  else
    sql = `SELECT * FROM incidents i ${joinsql} WHERE i.disasterTypeName="${type.capitalize()}"`;
  return db
    .promise()
    .query(sql)
    .then((result) => {
      res.json(result[0]);
    })
    .catch((err) => next(new CustomError("Cannot get incidents", 400)));
};

exports.getImagesForIncidentById = (req, res, next) => {
  let { id } = req.params;
  const imageSql = `SELECT path from images where incidentID = ?`;

  return db
    .promise()
    .query(imageSql, id)
    .then((result) => res.json(result[0]))
    .catch((err) =>
      next(new CustomError("Cannot get images for incident" + id, 400))
    );
};

exports.insertIncident = (req, res, next) => {
  const incidentDetails = req.body;

  const incident = getObjectWithKeysInArray(INCIDENT_KEYS, incidentDetails);

  let incidentSql = `INSERT INTO incidents SET ?`;

  const { disasterTypeName } = incident;

  //insert into incident table first
  return db
    .promise()
    .query(incidentSql, incident)
    .then((result) => {
      let incidentID, otherSql;
      incidentID = result[0].insertId;

      const otherDetails = getObjectWithKeysInArray(
        eval(`${disasterTypeName}_KEYS`.toUpperCase()),
        incidentDetails
      );

      //upload images if any
      if (req.files.length > 0) {
        let imageSql = `INSERT INTO images SET ?`;
        req.files.forEach((file) => {
          db.promise()
            .query(imageSql, { incidentID, path: file.path })
            .catch((err) => next(new CustomError("Cannot upload image")));
        });
      }

      //make suitable sql commands to enter into respective disasterType
      if (disasterTypes.includes(disasterTypeName)) {
        otherDetails[`${disasterTypeName.toLowerCase()}ID`] = incidentID;
        otherSql = `INSERT INTO ${disasterTypeName.toLowerCase()}s SET ?`;
      } else {
        return next(new CustomError("Invalid disaster typename", 404));
      }

      //Insert into respective disasterType
      return db
        .promise()
        .query(otherSql, otherDetails)
        .then((result) => {
          res.json({ message: "incidents created successfully" });
        })
        .catch((err) => next(new CustomError("Cannot get incidents", 400)));
    })
    .catch((err) => next(new CustomError("Cannot insert incident" + err, 400)));
};

exports.updateIncidentById = (req, res, next) => {
  const {
    body: incidentDetails,
    params: { id },
  } = req;

  const incident = getObjectWithKeysInArray(INCIDENT_KEYS, incidentDetails);
  let { imagesToDelete } = incidentDetails;

  if (imagesToDelete && !Array.isArray(imagesToDelete))
    imagesToDelete = [imagesToDelete];

  return db
    .promise()
    .query(`SELECT disasterTypeName FROM incidents WHERE incidentID = ? `, id)
    .then((result) => {
      disasterTypeName = result[0][0].disasterTypeName;

      const otherDetails = disasterTypes.includes(disasterTypeName)
        ? getObjectWithKeysInArray(
            eval(`${disasterTypeName}_KEYS`.toUpperCase()),
            incidentDetails
          )
        : {};

      //upload images if any
      if (req.files.length > 0) {
        let imageSql = `INSERT INTO images SET ?`;
        req.files.forEach((file) => {
          db.promise()
            .query(imageSql, { incidentID: id, path: file.path })
            .catch((err) => next(new CustomError("Cannot upload image")));
        });
      }

      let sql =
        Object.keys(incident).length > 0
          ? `UPDATE incidents SET ? WHERE incidentID = ?`
          : `SELECT * FROM datasources LIMIT 1`;

      return db
        .promise()
        .query(sql, [incident, id])
        .then((result) => {
          sql =
            Object.keys(otherDetails).length > 0
              ? `UPDATE ${disasterTypeName.toLowerCase()}s SET ? WHERE ${disasterTypeName.toLowerCase()}ID = ?`
              : `SELECT * FROM datasources LIMIT 1`; //any valid query

          return db
            .promise()
            .query(sql, [otherDetails, id])
            .then((result) => {
              sql = `DELETE FROM images where path = ?`;
              if (imagesToDelete)
                imagesToDelete.forEach((imageToDelete) => {
                  db.promise()
                    .query(sql, imageToDelete)
                    .catch((err) =>
                      next(new CustomError(`Cannot delete images` + err, 400))
                    );
                  fs.unlinkSync(imageToDelete);
                });
              return res.json({ message: "updated" });
            })
            .catch((err) =>
              next(
                new CustomError(
                  `Cannot Update ${disasterTypeName.toLowerCase()}s` + err,
                  400
                )
              )
            );
        })
        .catch((err) =>
          next(new CustomError("Cannot Update incidents" + err, 400))
        );
    })
    .catch((err) =>
      next(new CustomError("Cannot get disaster type name " + err, 400))
    );
};

exports.deleteIncidentById = (req, res, next) => {
  const { id } = req.params;

  const imageSql = `SELECT path from images where incidentID = ?`;
  return db
    .promise()
    .query(imageSql, id)
    .then((result) => {
      images = result[0];
      images.forEach((image) => {
        fs.unlinkSync(image.path);
      });
      let sql = `DELETE FROM incidents where incidentID = ?`;
      return db
        .promise()
        .query(sql, id)
        .then(() => {
          return res.json({ message: "deleted successfully" });
        })
        .catch((err) =>
          next(new CustomError("Cannot delete images for incident" + id, 400))
        );
    })
    .catch((err) => next(new CustomError("Cannot delete incidents", 400)));
};
