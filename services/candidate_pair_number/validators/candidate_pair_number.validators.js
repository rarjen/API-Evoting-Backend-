const { check, body } = require("express-validator");

const createPairNumberValidator = [
  check("presidental_candidate_id")
    .exists()
    .withMessage("Must have presidental_candidate_id")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("vice_presidental_candidate_id")
    .exists()
    .withMessage("Must have vice_presidental_candidate_id")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("number")
    .exists()
    .withMessage("Must have number")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isNumeric()
    .withMessage("Must be number"),
];

const updatePairNumberValidator = [
  check("presidental_candidate_id")
    .if(body("presidental_candidate_id").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("vice_presidental_candidate_id")
    .if(body("vice_presidental_candidate_id").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("number")
    .if(body("number").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isNumeric()
    .withMessage("Must be string"),
];

module.exports = {
  createPairNumberValidator,
  updatePairNumberValidator,
};
