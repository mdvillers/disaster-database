const express = require("express");
const {
  getAllvms,
  insertvm,
  deletevmById,
} = require("../controllers/vm.controller");

const router = express.Router();

router.get("/view", getAllvms);
router.post("/insert", insertvm);
router.delete("/delete/:id", deletevmById);

module.exports = router;
