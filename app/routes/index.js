const express = require("express");
const { LoginController } = require("../controllers/login.controller");
const { RegisterController } = require("../controllers/register.controller");
const { UserController } = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.middleware");
const { loginValidator } = require("../validators/login.validator");
const router = express.Router();
const { registerValidator } = require("../validators/register.validator");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", registerValidator, RegisterController.register);
router.post("/login", loginValidator, LoginController.login);
router.get("/auth-user", authMiddleware, UserController.authUser);

module.exports = router;
