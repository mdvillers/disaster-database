const express = require("express");
const {
  getAllIncidents,
  insertIncident,
  deleteIncidentById,
} = require("../controllers/incident.controller");

const router = express.Router();

router.get("/view", getAllIncidents);
router.post("/insert", insertIncident);
router.delete("/delete/:id", deleteIncidentById);

module.exports = router;
