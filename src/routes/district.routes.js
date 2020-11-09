const express = require("express");
const {
  getAllDistricts,
  insertDistrict,
  deleteDistrictByName,
} = require("../controllers/district.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/view", getAllDistricts);

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken)
router.post("/insert", insertDistrict);
router.delete("/delete/:name", deleteDistrictByName);

module.exports = router;
