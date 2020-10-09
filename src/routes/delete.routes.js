const express = require("express");
const { deleteIncidentById } = require("../controllers/delete.controllers");

const router = express.Router();

router.delete("/incident/:id", deleteIncidentById);

module.exports = router;
