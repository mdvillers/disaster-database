const express = require("express");
const {
  getAllvms,
  getVmsByDistrictName,
  insertvm,
  deletevmById,
} = require("../controllers/vm.controller");

const router = express.Router();

router.get("/view", getAllvms);
router.get("/district/:name",getVmsByDistrictName);
router.post("/insert", insertvm);
router.delete("/delete/:id", deletevmById);

module.exports = router;
