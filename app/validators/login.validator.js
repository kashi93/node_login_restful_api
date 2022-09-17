const { check, validationResult } = require("express-validator");

exports.loginValidator = [
  check("username")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("please fill in your username/email")
    .bail(),
  check("password")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Field is required!")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  },
];
