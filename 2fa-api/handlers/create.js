const bcrypt = require("bcrypt");
const { ONE_WEEK } = require("../constants");
const db = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const create = function (req, res, next) {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const { phone } = req.body;

    bcrypt.hash(password, process.env.BCRYPT_SALT, function (_, hash) {
      db.connection.query(
        `INSERT INTO Users (email, password, phone) VALUES ('${email}', '${hash}', '${phone}')`,
        (error) => {
          if (error) {
            return next({ status: 500 });
          }

          const token = jwt.sign(
            { loggedIn: true },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: ONE_WEEK }
          );

          return res.status(200).json({ token });
        }
      );
    });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = create;
