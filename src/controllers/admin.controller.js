const { db } = require("../connectdb");
const CustomError = require("../error/CustomError");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const { JWT_KEY } = process.env;

exports.signin = (req, res, next) => {
  const { username, password } = req.body;
  let sql = `SELECT * FROM Admin WHERE username=?`;
  return db
    .promise()
    .query(sql, username)
    .then((result) => {
      if (result[0].length < 1) {
        return next(new CustomError(`Username: ${username} do not exists!`));
      }
      const { userID, password: passwordInDB } = result[0][0];

      var isValidPassword = bcrypt.compareSync(password, passwordInDB);

      if (!isValidPassword) {
        return next(new CustomError(`Password do not match!`));
      }

      const token = jwt.sign({ userID }, JWT_KEY, {
        expiresIn: 864000,
      });

      return res.json({ token });
    })
    .catch((err) => next(new CustomError(`Couldn't signin`, 400)));
};

exports.createAdmin = async (req, res, next) => {
  let { username, password } = req.body;
  let sql = `SELECT * FROM Admin WHERE username=?`;
  return db
    .promise()
    .query(sql, username)
    .then((result) => {
      if (result[0].length > 0) {
        return next(
          new CustomError(`Username: ${username} already exists!`, 400)
        );
      }

      password = bcrypt.hashSync(password, 8);

      sql = `INSERT INTO Admin SET ?`;
      return db
        .promise()
        .query(sql, { username, password })
        .then((result) => res.json({ message: "created admin" }))
        .catch(next(new CustomError(`Couldn't create Admin`, 400)));
    })
    .catch((err) => next(new CustomError(`couldn't find username!`, 400)));
};

exports.getUser = async (req, res, next) => {
  const { userID } = req;
  let sql = `SELECT * FROM Admin WHERE userID=?`;
  return db
    .promise()
    .query(sql, userID)
    .then((result) => {
      if (result[0].length < 1) {
        return next(new CustomError(`User do not exist!`));
      }
      const { username } = result[0][0];

      return res.json({ username });
    })
    .catch((err) => next(new CustomError(`cannot get user`, 400)));
};
