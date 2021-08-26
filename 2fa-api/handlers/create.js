const bcrypt = require("bcrypt");
const { ONE_WEEK } = require("../constants");
const db = require("../db");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
require("dotenv").config();

const create = function (req, res, next) {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const { phone } = req.body;

    bcrypt.hash(password, process.env.BCRYPT_SALT, async function (_, hash) {
      const user = await User.create({
        email,
        password: hash,
        phone,
      }).catch((error) => next({ status: 500 }));

      if (!user.id) {
        return next({ status: 500 });
      }

      const token = jwt.sign({ loggedIn: true }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: ONE_WEEK,
      });

      return res.status(200).json({ token });
    });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = create;
