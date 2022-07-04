function errHandler(err, req, res, next) {
  let code = 500;
  let msg = "Internal Server Error";
  if (err.name === "JsonWebTokenError") {
    code = 401;
    msg = "Token Unauthenticated";
  }
  if (err.message === "Unauthorized") {
    code = 403;
    msg = "Unauthorized";
  }
  if (err.message === "failed_login") {
    code = 401;
    msg = "Invalid Email/Password";
  }
  res.status(code).json({
    status: code,
    message: msg,
  });
}

module.exports = errHandler;
