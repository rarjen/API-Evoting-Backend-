const {
  create,
  getOne,
  getAll,
  update,
  destroy,
} = require("../../services/presidental");
const responseHandler = require("../../helpers/responseHandler");

const createPresidental = async (req, res, next) => {
  try {
    const result = await create(req);

    return responseHandler.created(res, "Success create presidental!", result);
  } catch (error) {
    next(error);
  }
};

const getPresidental = async (req, res, next) => {
  try {
    const result = await getOne(req);

    return responseHandler.succes(res, "Success get presidental!", result);
  } catch (error) {
    next(error);
  }
};

const getPresidentals = async (req, res, next) => {
  try {
    const result = await getAll();

    return responseHandler.succes(res, "Success get presidentals!", result);
  } catch (error) {
    next(error);
  }
};

const updatePresidental = async (req, res, next) => {
  try {
    const result = await update(req);

    return responseHandler.succes(res, "Success update presidental!", result);
  } catch (error) {
    next(error);
  }
};

const destroyPresidental = async (req, res, next) => {
  try {
    const result = await destroy(req);

    return responseHandler.succes(res, "Success delete presidental!", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPresidental,
  getPresidental,
  getPresidentals,
  updatePresidental,
  destroyPresidental,
};
