const express = require("express");
const {
  getAllDisasterTypes,
  insertDisasterType,
  deleteDisasterTypeByName,
} = require("../controllers/disasterType.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/view", getAllDisasterTypes);

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken)
router.post("/insert", insertDisasterType);
router.delete("/delete/:name", deleteDisasterTypeByName);

module.exports = router;
