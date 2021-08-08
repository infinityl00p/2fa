const db = require("../db");
const twilio = require("../twilio");

const twilioClient = twilio.twilioClient;

const login = function (req, res) {
  try {
    const { email } = req.body;
    const { password } = req.body;

    db.connection.query(
      `SELECT id, phone from Users WHERE email='${email}' and password='${password}'`,
      (error, results, _) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error });
        }

        if (!results.length) {
          return res
            .status(200)
            .json({ error: "incorrect email/password combo" });
        }

        // send success message
        res.status(200).json(results[0]);

        // then send OTP text
        twilioClient.verify
          .services(process.env.TWILIO_SERVICE_SID)
          .verifications.create({ to: `+1${results[0].phone}`, channel: "sms" })
          .then((verification) => console.log(verification.status))
          .catch((error) => {
            throw new Error(error);
          });

        return;
      }
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.handler = login;
