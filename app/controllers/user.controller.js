class UserController {
  authUser(req, res) {
    return res.status(200).json({
      status: "Success",
      message: "",
      data: {
        user: req.auth_user,
      },
    });
  }
}

module.exports.UserController = new UserController();
