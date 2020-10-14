const express = require("express");
const {
  getAllVDCorMs,
  insertVDCorM,
  deleteVDCorMById,
} = require("../controllers/VDCorM.controller");

const router = express.Router();

router.get("/view", getAllVDCorMs);
router.post("/insert", insertVDCorM);
router.delete("/delete/:id", deleteVDCorMById);

module.exports = router;
