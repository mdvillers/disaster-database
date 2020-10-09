const express = require("express");
const { insertIncident } = require("../controllers/insert.controllers");

const router = express.Router();

router.post("/incident", insertIncident);

module.exports = router;
