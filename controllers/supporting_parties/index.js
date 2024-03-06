const {
  create,
  getOne,
  getAll,
  update,
  destroy,
} = require("../../services/supporting_parties");
const responseHandler = require("../../helpers/responseHandler");

const createSupportingParty = async (req, res, next) => {
  try {
    const result = await create(req);

    return responseHandler.created(
      res,
      "Success create supporting party!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const getSupportingParty = async (req, res, next) => {
  try {
    const result = await getOne(req);

    return responseHandler.succes(res, "Success get supporting party!", result);
  } catch (error) {
    next(error);
  }
};

const getSupportingParties = async (req, res, next) => {
  try {
    const result = await getAll(req);

    return responseHandler.succes(
      res,
      "Success get supporting parties!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const updateSuportingParty = async (req, res, next) => {
  try {
    const result = await update(req);

    return responseHandler.succes(
      res,
      "Success update supporting party!",
      result
    );
  } catch (error) {
    next(error);
  }
};

const destroySupportingParty = async (req, res, next) => {
  try {
    const result = await destroy(req);

    return responseHandler.succes(
      res,
      "Success delete supporting party!",
      result
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSupportingParty,
  getSupportingParty,
  getSupportingParties,
  updateSuportingParty,
  destroySupportingParty,
};
