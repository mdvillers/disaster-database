const express = require("express");
const {
  getAllDataSources,
  insertDataSource,
  deleteDataSourceBySourceId,
} = require("../controllers/dataSource.controller");

const router = express.Router();

router.get("/view", getAllDataSources);
router.post("/insert", insertDataSource);
router.delete("/delete/:sourceId", deleteDataSourceBySourceId);

module.exports = router;
