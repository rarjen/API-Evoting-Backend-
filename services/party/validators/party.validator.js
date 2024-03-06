const { check, body } = require("express-validator");

const createPoliticalPartyValidator = [
  check("name")
    .exists()
    .withMessage("Must have name")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("abbreviation")
    .exists()
    .withMessage("Must have abbreviation")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
];

const updatePolitcalPartyValidator = [
  check("name")
    .if(body("name").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("abbreviation")
    .if(body("abbreviation").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
];

module.exports = {
  createPoliticalPartyValidator,
  updatePolitcalPartyValidator,
};
