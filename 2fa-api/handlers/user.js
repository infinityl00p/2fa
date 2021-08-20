const jwt = require("jsonwebtoken");
const { BEARER } = require("../constants");
require("dotenv").config();

const user = function (req, res, next) {
  try {
    const { authorization } = req?.headers;

    const authArray = authorization.split(" ");
    if (authArray[0] === BEARER) {
      const authtoken = authArray[1];
      // const decoded = jwt.verify(authtoken, process.env.JWT_TOKEN_SECRET);
      return res.status(200).json({ loggedIn: true });
    }

    return next({ status: 500 });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = user;
