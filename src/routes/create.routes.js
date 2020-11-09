const express = require("express");
const {
  createDatabase,
  createTables,
} = require("../controllers/create.controllers");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

/*REQUIRES AUTHENTICATION*/
router.use(verifyToken)
router.get("/database", createDatabase); //Run this for very first time
router.get("/tables", createTables); // set database as disaster in  'connectdb.js' and run this

module.exports = router;
