const { Hash } = require("../../vendor/rainbows/password/hash");
const { UserModel } = require("../models/user.model");

class RegisterController {
  async register(req, res) {
    try {
      const password = await Hash.make(req.body.password);
      const user = await UserModel.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });

      res.status(200).json({
        status: "Success",
        message: "",
        data: {
          user,
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

module.exports.RegisterController = new RegisterController();
