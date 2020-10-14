const express = require("express");
const {
  getAllDisasterTypes,
  insertDisasterType,
  deleteDisasterTypeByName,
} = require("../controllers/disasterType.controller");

const router = express.Router();

router.get("/view", getAllDisasterTypes);
router.post("/insert", insertDisasterType);
router.delete("/delete/:name", deleteDisasterTypeByName);

module.exports = router;
