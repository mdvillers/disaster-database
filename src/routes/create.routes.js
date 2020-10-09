const express = require("express");
const {
  createDatabase,
  createTable,
} = require("../controllers/create.controllers");

const router = express.Router();

router.get("/database", createDatabase);
router.get("/table", createTable);

module.exports = router;
