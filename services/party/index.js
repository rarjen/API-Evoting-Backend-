const { Political_party } = require("../../models");
const ApiError = require("../../helpers/errorHandler");

const create = async (req) => {
  const result = await Political_party.create(req.body);

  return result;
};

const createMany = async (req) => {
  const result = await Political_party.bulkCreate(req.body.parties);

  return result;
};

const getOne = async (req) => {
  const result = await Political_party.findOne({
    where: { id: req.params.id },
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  return result;
};

const getAll = async (req) => {
  const result = await Political_party.findAll({});

  console.log(result);

  return result;
};

const update = async (req) => {
  await getOne(req);

  const result = await Political_party.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return result;
};

const destroy = async (req) => {
  await getOne(req);

  const result = await Political_party.destroy({
    where: { id: req.params.id },
  });

  return result;
};

module.exports = { create, getOne, update, getAll, destroy, createMany };
