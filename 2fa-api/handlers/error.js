const errorHandler = function (error, req, res, next) {
  return res.sendStatus(error.status);
};

exports.handler = errorHandler;
