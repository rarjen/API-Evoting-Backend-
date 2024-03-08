const { create, getAll } = require("../../services/vote");
const responseHandler = require("../../helpers/responseHandler");

const createVotingLog = async (req, res, next) => {
  try {
    const result = await create(req);
    return responseHandler.created(res, "Success vote!", result);
  } catch (error) {
    next(error);
  }
};

const getAllVotingLog = async (req, res, next) => {
  try {
    const result = await getAll(req);

    return responseHandler.succes(res, "Success get all data", result);
  } catch (error) {
    next(error);
  }
};

const getOneVotigLog = async (req, res, next) => {
  try {
    const result = await getOne(req);

    return responseHandler.succes(res, "Success get data", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVotingLog,
  getAllVotingLog,
  getOneVotigLog,
};
