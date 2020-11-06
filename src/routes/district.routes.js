const express = require("express");
const {
  getAllDistricts,
  insertDistrict,
  deleteDistrictByName,
} = require("../controllers/district.controller");

const router = express.Router();

router.get("/view", getAllDistricts);
router.post("/insert", insertDistrict);
router.delete("/delete/:name", deleteDistrictByName);

module.exports = router;
