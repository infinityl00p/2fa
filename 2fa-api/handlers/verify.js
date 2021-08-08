const twilio = require("../twilio");

const twilioClient = twilio.twilioClient;

const verify = function (req, res) {
  try {
    const { OTP } = req.query;
    const { phone } = req.query;

    twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+1${phone}`, code: OTP })
      .then((response) => {
        req.session.loggedIn = response.valid;

        return res
          .status(200)
          .json({ isValid: req.session.loggedIn, sessionId: req.sessionID });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.handler = verify;
