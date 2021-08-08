const logout = function (req, res) {
  try {
    req.session.destroy();

    return res.status(200).json({ loggedIn: req?.session?.loggedIn || false });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.handler = logout;
