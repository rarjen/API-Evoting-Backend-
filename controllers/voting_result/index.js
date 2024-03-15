const {
  create,
  update,
  getAll,
  getOne,
  destroy,
} = require("../../services/voting_result");
const responseHandler = require("../../helpers/responseHandler");

const createVotingResult = async (req, res, next) => {
  try {
    const result = await create(req);
    return responseHandler.created(res, "Success vote!", result);
  } catch (error) {
    next(error);
  }
};

const getAllVotingResult = async (req, res, next) => {
  try {
    const result = await getAll(req);

    return responseHandler.succes(res, "Success get all data", result);
  } catch (error) {
    next(error);
  }
};

const getOneVotingResult = async (req, res, next) => {
  try {
    const result = await getOne(req);

    return responseHandler.succes(res, "Success get data", result);
  } catch (error) {
    next(error);
  }
};

const updateVotingResult = async (req, res, next) => {
  try {
    const result = await update(req);

    return responseHandler.succes(res, "Success update data", result);
  } catch (error) {
    next(error);
  }
};

const destroyVotingResult = async (req, res, next) => {
  try {
    const result = await destroy(req);

    return responseHandler.succes(res, "Success delete data", result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createVotingResult,
  updateVotingResult,
  getAllVotingResult,
  getOneVotingResult,
  destroyVotingResult,
};
