const user = function (req, res) {
  try {
    return res.status(200).json({ loggedIn: req.session.loggedIn });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
};

exports.handler = user;
