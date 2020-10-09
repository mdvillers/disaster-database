const express = require("express");
const { getAllIncidents } = require("../controllers/view.controllers");

const router = express.Router();

router.get("/incident", getAllIncidents);

module.exports = router;
