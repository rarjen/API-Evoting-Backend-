const {
  create,
  getOne,
  getAll,
  update,
  destroy,
} = require("../../services/candidate_pair_number");
const responseHandler = require("../../helpers/responseHandler");

const createNumber = async (req, res, next) => {
  try {
    const result = await create(req);

    return responseHandler.created(res, "Success create number!", result);
  } catch (error) {
    next(error);
  }
};

const getNumber = async (req, res, next) => {
  try {
    const result = await getOne(req);

    return responseHandler.succes(res, "Success get number!", result);
  } catch (error) {
    next(error);
  }
};

const getNumbers = async (req, res, next) => {
  try {
    const result = await getAll();

    return responseHandler.succes(res, "Success get numbers!", result);
  } catch (error) {
    next(error);
  }
};

const updateNumber = async (req, res, next) => {
  try {
    const result = await update(req);

    return responseHandler.succes(res, "Success update number!", result);
  } catch (error) {
    next(error);
  }
};

const destroyNumber = async (req, res, next) => {
  try {
    const result = await destroy(req);

    return responseHandler.succes(res, "Success delete number!", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createNumber,
  getNumber,
  getNumbers,
  updateNumber,
  destroyNumber,
};
