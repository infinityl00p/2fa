const twilio = require("../twilio");

const twilioClient = twilio.twilioClient;

const verify = function (req, res) {
  try {
    const { OTP } = req.query;
    const { phone } = req.query;

    twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: `+1${phone}`, code: OTP })
      .then((response) => res.status(200).json({ isValid: response.valid }))
      .catch(() => next({ status: 503 }));
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = verify;
