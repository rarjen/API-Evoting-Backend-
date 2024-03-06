const { validationResult } = require("express-validator");
const ApiError = require("../helpers/errorHandler");

module.exports = (validations) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validations.map((validation) => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }

      throw ApiError.unprocessableEntity(
        "Please check your input data",
        errors.array()
      );
    } catch (error) {
      next(error);
    }
  };
};
