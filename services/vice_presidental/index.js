const { Vice_presidental_candidate, Political_party } = require("../../models");
const ApiError = require("../../helpers/errorHandler");

const createData = async (req) => {
  const partyExist = await Political_party.findOne({
    where: { id: req.body.political_party_id },
  });

  if (!partyExist) {
    throw ApiError.notFound("Data partai tidak ada!");
  }

  const result = await Vice_presidental_candidate.create(req.body);
  return result;
};

const getOne = async (req) => {
  const result = await Vice_presidental_candidate.findOne({
    where: { id: req.params.id },
    include: { model: Political_party, as: "political_party" },
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  return result;
};

const getAll = async (req) => {
  const result = await Vice_presidental_candidate.findAll({
    include: { model: Political_party, as: "political_party" },
  });

  return result;
};

const update = async (req) => {
  await getOne(req);

  const result = await Vice_presidental_candidate.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return result;
};

const destroy = async (req) => {
  await getOne(req);

  const result = await Vice_presidental_candidate.destroy({
    where: { id: req.params.id },
  });

  return result;
};

module.exports = { createData, getOne, update, getAll, destroy };
