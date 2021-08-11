const user = function (req, res, next) {
  try {
    return res.status(200).json({ loggedIn: req.session.loggedIn });
  } catch (error) {
    return next({ status: 500 });
  }
};

exports.handler = user;
