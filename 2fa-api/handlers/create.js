const bcrypt = require("bcrypt");
const db = require("../db");
require("dotenv").config();

const create = function (req, res) {
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

          req.session.loggedIn = true;
          return res.status(200).json({ loggedIn: true });
        }
      );
    });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = create;
