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
            return res.status(500).json({ error });
          }

          req.session.loggedIn = true;
          return res.status(200).json({ loggedIn: true });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.handler = create;
