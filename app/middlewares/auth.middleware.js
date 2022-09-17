const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.authMiddleware = function (req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (bearerHeader) {
    try {
      const bearer = bearerHeader.split(" ");
      const bearerToken = bearer[1];
      const decoded = jwt.verify(bearerToken, process.env.APP_KEY);
      req.auth_user = decoded.user;
      next();
    } catch (error) {
      return res.status(403).json({
        status: "Error",
        message: "Unauthenticated",
        data: {},
      });
    }
  } else {
    return res.status(400).json({
      status: "Error",
      message: "Request required bearer authorization!",
      data: {},
    });
  }
};
