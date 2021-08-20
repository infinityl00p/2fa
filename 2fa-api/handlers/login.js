const bcrypt = require("bcrypt");
const db = require("../db");
const twilio = require("../twilio");
const jwt = require("jsonwebtoken");
const { ONE_WEEK } = require("../constants");

require("dotenv").config();

const twilioClient = twilio.twilioClient;

const login = function (req, res, next) {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, process.env.BCRYPT_SALT);

    bcrypt.compare(password, hash, function (err, passwordMatch) {
      db.connection.query(
        `SELECT id, phone from Users WHERE email='${email}' and password='${hash}'`,
        (error, results, _) => {
          if (!results.length || !passwordMatch) {
            return next({ status: 401 });
          } else if (results.length > 1 || error) {
            return next({ status: 500 });
          }

          twilioClient.verify
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({
              to: `+1${results[0].phone}`,
              channel: "sms",
            })
            .then(() => {
              const token = jwt.sign(
                { email, phone: results[0].phone },
                process.env.JWT_TOKEN_SECRET,
                { expiresIn: ONE_WEEK }
              );

              return res.status(200).json({ token });
            })
            .catch(() => next({ status: 503 }));
        }
      );
    });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = login;
