const express = require("express");
const {
  getAllDataSources,
  insertDataSource,
  deleteDataSourceBySourceId,
} = require("../controllers/dataSource.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/view", getAllDataSources);

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken)
router.post("/insert", insertDataSource);
router.delete("/delete/:sourceId", deleteDataSourceBySourceId);

module.exports = router;
