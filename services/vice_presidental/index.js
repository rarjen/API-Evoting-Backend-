const {
  Vice_presidental,
  Presidental_candidate,
  Political_party,
} = require("../../models");
const ApiError = require("../../helpers/errorHandler");

const create = async (req) => {
  const partyExist = await Political_party.findOne({
    where: { id: req.body.political_party_id },
  });

  if (!partyExist) {
    throw ApiError.notFound("Data partai tidak ada!");
  }

  const presidentalExist = await Presidental_candidate.findOne({
    where: { id: req.body.presidental_partner_id },
  });

  if (!presidentalExist) {
    throw ApiError.notFound("Data presiden tidak ada!");
  }

  const result = await Vice_presidental.create(req.body);

  return result;
};

const getOne = async (req) => {
  const result = await Vice_presidental.findOne({
    where: { id: req.params.id },
    include: [
      { model: Political_party, as: "political_party" },
      { model: Presidental_candidate, as: "presidental" },
    ],
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  return result;
};

const getAll = async (req) => {
  const result = await Vice_presidental.findAll({
    include: [
      { model: Political_party, as: "political_party" },
      { model: Presidental_candidate, as: "presidental" },
    ],
  });

  return result;
};

const update = async (req) => {
  await getOne(req);

  const result = await Vice_presidental.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return result;
};

const destroy = async (req) => {
  await getOne(req);

  const result = await vice_presidental_candidate.delete({
    where: { id: req.params.id },
  });

  return result;
};

module.exports = { create, getOne, update, getAll, destroy };
