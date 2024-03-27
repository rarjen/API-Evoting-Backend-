const { Political_party, Presidental_candidate } = require("../../models");
const ApiError = require("../../helpers/errorHandler");

const create = async (req) => {
  const partyExist = await Political_party.findOne({
    where: { id: req.body.political_party_id },
  });

  if (!partyExist) {
    throw ApiError.notFound("Data partai tidak ada!");
  }

  const result = await Presidental_candidate.create(req.body);

  return result;
};

const getOne = async (req) => {
  const result = await Presidental_candidate.findOne({
    where: { id: req.params.id },
    include: { model: Political_party, as: "political_party" },
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  const modifiedResult = {
    id: result.id,
    name: result.name,
    age: result.age,
    description: result.description,
    dob: result.dob,
    imgUrl: result.img_url,
    partyImg: result.political_party.img_url,
    namaPartai: result.political_party.abbreviation,
  };

  return modifiedResult;
};

const getAll = async (req) => {
  const result = await Presidental_candidate.findAll({});

  const modifiedResults = result.map((data) => ({
    id: data.id,
    name: data.name,
    imgUrl: data.img_url,
  }));

  return modifiedResults;
};

const update = async (req) => {
  await getOne(req);

  const result = await Presidental_candidate.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return result;
};

const destroy = async (req) => {
  await getOne(req);

  const result = await Presidental_candidate.destroy({
    where: { id: req.params.id },
  });

  return result;
};

module.exports = { create, getOne, update, getAll, destroy };
