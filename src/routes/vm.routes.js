const express = require("express");
const {
  getAllvms,
  getVmsByDistrictName,
  insertvm,
  deletevmById,
} = require("../controllers/vm.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/view", getAllvms);
router.get("/district/:name", getVmsByDistrictName);

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken);
router.post("/insert", insertvm);
router.delete("/delete/:id", deletevmById);

module.exports = router;
