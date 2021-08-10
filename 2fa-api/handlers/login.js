const bcrypt = require("bcrypt");
const db = require("../db");
const twilio = require("../twilio");
require("dotenv").config();

const twilioClient = twilio.twilioClient;

const login = function (req, res) {
  try {
    const { email } = req.body;
    const { password } = req.body;
    const hash = bcrypt.hashSync(password, process.env.BCRYPT_SALT);
    console.log("🚀 ~ file: login.js ~ line 13 ~ login ~ hash", hash);

    bcrypt.compare(password, hash, function (err, passwordMatch) {
      db.connection.query(
        `SELECT id, phone from Users WHERE email='${email}' and password='${hash}'`,
        (error, results, _) => {
          if (error || !results.length) {
            return res.status(500).json({ error });
          }

          if (!passwordMatch) {
            return res
              .status(200)
              .json({ error: "incorrect email/password combo" });
          }

          if (results.length > 1) {
            throw new Error("Error: Duplicate user");
          }

          // send success message
          res.status(200).json(results[0]);

          // then send OTP text
          twilioClient.verify
            .services(process.env.TWILIO_SERVICE_SID)
            .verifications.create({
              to: `+1${results[0].phone}`,
              channel: "sms",
            })
            .then((verification) => console.log(verification.status))
            .catch((error) => {
              throw new Error(error);
            });

          return;
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.handler = login;
