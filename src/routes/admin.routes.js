const express = require("express");
const {
  signin,
  createAdmin,
  getUser,
} = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.post("/signin", signin); 
router.use(verifyToken);
router.post("/create", createAdmin);
router.get("/getuser", getUser);

module.exports = router;
