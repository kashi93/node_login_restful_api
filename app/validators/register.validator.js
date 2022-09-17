const { check, validationResult } = require("express-validator");
const { UserModel } = require("../models/user.model");

exports.registerValidator = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Field is required!")
    .bail()
    .custom((value) => {
      return UserModel.where("name", "=", value)
        .first()
        .then((user) => {
          if (user != null) {
            return Promise.reject("Name already taken");
          }
        });
    }),
  check("email")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Field is required!")
    .bail()
    .isEmail()
    .withMessage("Invalid email")
    .bail()
    .custom((value) => {
      return UserModel.where("email", "=", value)
        .first()
        .then((user) => {
          if (user != null) {
            return Promise.reject("Email already taken");
          }
        });
    }),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Field is required!")
    .bail()
    .isLength({ min: 5 })
    .withMessage("Invalid length")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
