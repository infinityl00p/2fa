const bcrypt = require("bcrypt");
const twilio = require("../twilio");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { ONE_WEEK } = require("../constants");

require("dotenv").config();

const twilioClient = twilio.twilioClient;

const login = async function (req, res, next) {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, process.env.BCRYPT_SALT);

    bcrypt.compare(password, hash, async function (error, passwordMatch) {
      const user = await User.findOne({
        where: { email, password: hash },
      });

      if (user === null || !passwordMatch) {
        return next({ status: 401 });
      } else if (error) {
        return next({ status: 500 });
      }

      twilioClient.verify
        .services(process.env.TWILIO_SERVICE_SID)
        .verifications.create({
          to: `+1${user.phone}`,
          channel: "sms",
        })
        .then(() => {
          const token = jwt.sign(
            { email, phone: user.phone },
            process.env.JWT_TOKEN_SECRET,
            { expiresIn: ONE_WEEK }
          );

          return res.status(200).json({ token });
        })
        .catch(() => next({ status: 503 }));
    });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = login;
