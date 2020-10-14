const express = require("express");
const {
  getAllDisasterGroups,
  insertDisasterGroup,
  deleteDisasterGroupByName,
} = require("../controllers/disasterGroup.controller");

const router = express.Router();

router.get("/view", getAllDisasterGroups);
router.post("/insert", insertDisasterGroup);
router.delete("/delete/:name", deleteDisasterGroupByName);

module.exports = router;
