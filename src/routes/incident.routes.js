const express = require("express");
const {
  getAllIncidents,
  insertIncident,
  deleteIncidentById,
  updateIncidentById,
} = require("../controllers/incident.controller");
const fileUpload = require("../middlewares/upload.middleware");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/view", getAllIncidents);
router.get("/view/:type", getAllIncidents);

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken);
router.post("/insert", fileUpload.array("images", 50), insertIncident);
router.patch("/update/:id", fileUpload.array("images", 50), updateIncidentById);
router.delete("/delete/:id", deleteIncidentById);

module.exports = router;
