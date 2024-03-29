const { User } = require("../../models");
const { Op } = require("sequelize");
const ApiError = require("../../helpers/errorHandler");
const { getHash, checkHash } = require("../../helpers/passwordHash");
const Validator = require("fastest-validator");
const v = new Validator();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = process.env;

const register = async (req) => {
  const { nik, email, password } = req.body;

  const schemaNik = {
    nik: { type: "string", min: 16 },
  };

  const schemaEmail = {
    email: { type: "email", label: "Email Address" },
  };

  const schemaPassword = {
    password: { type: "string", min: 6 },
  };

  const checkEmail = await v.compile(schemaEmail);
  const checkPassword = await v.compile(schemaPassword);
  const checkNik = await v.compile(schemaNik);

  const validateEmail = checkEmail({
    email: `${email}`,
  });

  const validatePassword = checkPassword({
    password: `${password}`,
  });

  const validateNik = checkNik({
    nik: `${nik}`,
  });

  // Email Validation
  if (validateEmail.length > 0) {
    throw ApiError.badRequest("Email tidak valid");
  }

  // Password Validation
  if (validatePassword.length > 0) {
    throw ApiError.badRequest("Password minimal 6 karakter");
  }

  // Nik Validation
  if (validateNik.length > 0) {
    throw ApiError.badRequest("Nik minimal 16 karakter");
  }

  const userExist = await User.findOne({
    where: {
      [Op.or]: [{ nik: nik }, { email: email }],
    },
  });

  if (userExist) {
    throw ApiError.badRequest("NIK or Email already exist!");
  }

  const passwordHashed = getHash(password);
  req.body.password = passwordHashed;
  req.body.isVoted = 0;

  if (!req.body.role) {
    req.body.role = "VOTER";
  }

  const result = await User.create(req.body);

  const resultWithoutPassword = { ...result.toJSON(), password: undefined };

  return resultWithoutPassword;
};

const login = async (req) => {
  const { nikOrEmailOrPhone, password } = req.body;

  if (!nikOrEmailOrPhone) {
    throw ApiError.badRequest("Email atau NIK harus diisi");
  }

  const schemaPassword = {
    password: { type: "string", min: 6 },
  };

  const checkPassword = await v.compile(schemaPassword);

  const validatePassword = checkPassword({
    password: `${password}`,
  });

  // Password Validation
  if (validatePassword.length > 0) {
    throw ApiError.badRequest("Password minimal 6 karakter");
  }

  const userExist = await User.findOne({
    where: {
      [Op.or]: [{ email: nikOrEmailOrPhone }, { nik: nikOrEmailOrPhone }],
    },
  });

  if (!userExist) {
    throw ApiError.badRequest("Email/NIK tidak ditemukan");
  }

  const match = checkHash(password, userExist.password);
  if (!match) {
    throw ApiError.badRequest("Password salah");
  }

  let payload = {
    id: userExist.id,
  };

  const token = jwt.sign(payload, JWT_SECRET_KEY);

  return { token };
};

const whoami = async (user_id) => {
  const result = await User.findOne({
    where: { id: user_id },
    attributes: {
      exclude: ["password"],
    },
  });

  return result;
};

const resetPassword = async (req) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = req.user;

  if (newPassword !== confirmPassword) {
    throw ApiError.badRequest("Password tidak sama!");
  }

  const checkExist = await User.findOne({ where: { id: user.id } });

  if (!checkExist) {
    throw ApiError.notFound("User tidak ditemukan!");
  }

  const match = checkHash(oldPassword, checkExist.password);
  if (!match) {
    throw ApiError.badRequest("Password lama salah");
  }

  const passwordHashed = getHash(confirmPassword);

  const result = await User.update(
    { password: passwordHashed },
    { where: { id: user.id } }
  );

  return result;
};

module.exports = { register, login, whoami, resetPassword };
