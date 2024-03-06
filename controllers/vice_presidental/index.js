const {
  create,
  getOne,
  getAll,
  update,
  destroy,
} = require("../../services/vice_presidental");
const responseHandler = require("../../helpers/responseHandler");

const createVicePresidental = async (req, res, next) => {
  try {
    const result = await create(req);

    return responseHandler.created(
      res,
      "Success create vice presidental!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const getVicePresidental = async (req, res, next) => {
  try {
    const result = await getOne(req);

    return responseHandler.succes(res, "Success get vice presidental!", result);
  } catch (error) {
    next(error);
  }
};

const getVicePresidentals = async (req, res, next) => {
  try {
    const result = await getAll();

    return responseHandler.succes(
      res,
      "Success get vice presidentals!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const updateVicePresidental = async (req, res, next) => {
  try {
    const result = await update(req);

    return responseHandler.succes(
      res,
      "Success update vice presidental!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const destroyVicePresidental = async (req, res, next) => {
  try {
    const result = await destroy(req);

    return responseHandler.succes(
      res,
      "Success delete vice presidental!",
      result
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVicePresidental,
  getVicePresidental,
  getVicePresidentals,
  updateVicePresidental,
  destroyVicePresidental,
};
