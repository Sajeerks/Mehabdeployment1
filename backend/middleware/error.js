const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "internal server error";

  // wrong mongoDB Id error
  if (err.name === "CastError") {
    const message = `resouce not fond invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `duplicate ${Object.keys(err.keyValue)} entered`;
    err = new ErrorHandler(message, 400);
  }

  if (err.name === "jsonWebTokenError") {
    const message = `jsonwebtoken  invalid  try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `jsonwebtoken expired    try again`;
    err = new ErrorHandler(message, 400);
  }





  res.status(err.statusCode).json({
    success: false,
    //  error:err.stack

    message: err.message,
  });
};
