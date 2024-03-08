const { register, login, whoami } = require("../../services/auth");
const responseHandler = require("../../helpers/responseHandler");

const registerAccount = async (req, res, next) => {
  try {
    const result = await register(req);

    return responseHandler.created(res, "Success create account!", result);
  } catch (error) {
    next(error);
  }
};

const loginAccount = async (req, res, next) => {
  try {
    const result = await login(req);

    return responseHandler.succes(res, "Success login!", result);
  } catch (error) {
    next(error);
  }
};

const authMe = async (req, res, next) => {
  const user = req.user;
  try {
    const result = await whoami(user.id);
    return responseHandler.succes(res, "Success", result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerAccount,
  loginAccount,
  authMe,
};
