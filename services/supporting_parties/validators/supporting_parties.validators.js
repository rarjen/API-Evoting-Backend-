const { check, body } = require("express-validator");

const createSupportPartyValidator = [
  check("candidateNumber")
    .exists()
    .withMessage("Must have candidateNumber")
    .bail()
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
];

const updateSupportPartyValidator = [
  check("candidateNumber")
    .if(body("candidateNumber").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
  check("partiesId")
    .if(body("partiesId").exists())
    .notEmpty()
    .withMessage("Can not be empty")
    .bail()
    .isString()
    .withMessage("Must be string"),
];

module.exports = {
  createSupportPartyValidator,
  updateSupportPartyValidator,
};
