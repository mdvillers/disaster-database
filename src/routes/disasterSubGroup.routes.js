const express = require("express");
const {
  getAllDisasterSubGroups,
  insertDisasterSubGroup,
  deleteDisasterSubGroupByName,
} = require("../controllers/disasterSubGroup.controller");

const router = express.Router();

router.get("/view", getAllDisasterSubGroups);
router.post("/insert", insertDisasterSubGroup);
router.delete("/delete/:id", deleteDisasterSubGroupByName);

module.exports = router;
