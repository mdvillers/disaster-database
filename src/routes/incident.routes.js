const express = require("express");
const {
  getAllIncidents,
  insertIncident,
  deleteIncidentById,
  updateIncidentById,
} = require("../controllers/incident.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/view", getAllIncidents);
router.get("/view/:type", getAllIncidents);

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken)
router.post("/insert", insertIncident);
router.patch("/update/:id", updateIncidentById);
router.delete("/delete/:id", deleteIncidentById);

module.exports = router;
