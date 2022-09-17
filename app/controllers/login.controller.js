const { Hash } = require("../../vendor/rainbows/password/hash");
const { UserModel } = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class LoginController {
  async login(req, res) {
    try {
      const user = await UserModel.where("email", "=", req.body.username)
        .orWhere("name", "=", req.body.username)
        .first();

      if (user == null) {
        return res.status(400).json({
          status: "Error",
          message: "User not found!",
          data: {},
        });
      }

      const attempt = await Hash.verify(req.body.password, user.password);

      if (!attempt) {
        return res.status(400).json({
          status: "Error",
          message: "Wrong password!",
          data: {},
        });
      }

      const token = jwt.sign({ user }, process.env.APP_KEY, {
        expiresIn: "1h", //2.21
      });

      res.status(200).json({
        status: "Success",
        message: "",
        data: {
          token,
        },
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        message: error.message,
        data: {},
      });
    }
  }
}

module.exports.LoginController = new LoginController();
