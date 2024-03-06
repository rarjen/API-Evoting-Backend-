const { check, body } = require("express-validator");

const createPresidentalCandidateValidator = [
  check("political_party_id")
    .exists()
    .withMessage("Must have political_party_id")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("name")
    .exists()
    .withMessage("Must have name")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("age")
    .exists()
    .withMessage("Must have age")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isNumeric()
    .withMessage("Must be integer"),
  check("description")
    .exists()
    .withMessage("Must have description")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
];

const updatePresidentalCandidateValidator = [
  check("political_party_id")
    .if(body("political_party_id").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("name")
    .if(body("name").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("age")
    .if(body("age").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isNumeric()
    .withMessage("Must be integer"),
  check("description")
    .if(body("description").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
];

module.exports = {
  createPresidentalCandidateValidator,
  updatePresidentalCandidateValidator,
};
