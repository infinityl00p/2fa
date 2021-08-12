const logout = function (req, res, next) {
  try {
    req.session.destroy();

    return res.status(200).json({ loggedIn: req?.session?.loggedIn || false });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = logout;
