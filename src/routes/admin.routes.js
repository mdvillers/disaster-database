const express = require("express");
const { signin, createAdmin ,getUser} = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.post("/signin", signin); //Run this for very first time
router.post("/create", createAdmin); // set database as disaster in  'connectdb.js' and run this
router.use(verifyToken)
router.get("/getuser", getUser);

module.exports = router;
