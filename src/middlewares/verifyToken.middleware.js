const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");
var jwt = require("jsonwebtoken");

const { JWT_KEY } = process.env;

exports.verifyToken = (req, res, next) => {
  /* SOMETIME BROWSER SENDS "OPTIONS" request*/
  if (req.method === "OPTIONS") {
    return next();
  }

  let token = req.headers.authorization; //'Bearer token'
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  token = token.split(" ")[1];

  jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return next(new CustomError("Not valid token! Unauthorized!", 401));
    }
    req.userID = decoded.userID;
    next();
  });
};
