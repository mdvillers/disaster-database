const express = require("express");
const {
  getAllIncidents,
  getAllFireIncidents,
  getAllEarthquakeIncidents,
  getAllFloodIncidents,
  insertIncident,
  deleteIncidentById,
  updateIncidentById,
} = require("../controllers/incident.controller");

const router = express.Router();

router.get("/view", getAllIncidents);
router.get("/fire/view", getAllFireIncidents);
router.get("/earthquake/view", getAllEarthquakeIncidents);
router.get("/flood/view", getAllFloodIncidents);
router.post("/insert", insertIncident);
router.patch("/update/:id", updateIncidentById);
router.delete("/delete/:id", deleteIncidentById);

module.exports = router;
