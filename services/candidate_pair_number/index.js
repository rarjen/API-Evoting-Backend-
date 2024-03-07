const ApiError = require("../../helpers/errorHandler");
const {
  Presidental_candidate,
  Vice_presidental_candidate,
  Candidate_pair_number,
  Supporting_party,
} = require("../../models");

const create = async (req) => {
  let partyId = [];
  let candidateId = [];
  const presidentalExist = await Presidental_candidate.findOne({
    where: { id: req.body.presidental_candidate_id },
  });

  partyId.push(presidentalExist.political_party_id);

  if (!presidentalExist) {
    throw ApiError.notFound("Data presiden tidak ada!");
  }

  const vicePresidentalExist = await Vice_presidental_candidate.findOne({
    where: { id: req.body.vice_presidental_candidate_id },
  });

  partyId.push(vicePresidentalExist.political_party_id);

  if (!vicePresidentalExist) {
    throw ApiError.notFound("Data vice presiden tidak ada!");
  }

  const result = await Candidate_pair_number.create(req.body);

  candidateId = result.id;

  Promise.all(
    partyId.map(async (data) => {
      await Supporting_party.create({
        candidate_pair_number_id: candidateId,
        political_party_id: data,
      });
    })
  );

  return result;
};

const getOne = async (req) => {
  const result = await Candidate_pair_number.findOne({
    where: { id: req.params.id },
    include: [
      { model: Presidental_candidate, as: "presidental_candidate" },
      { model: Vice_presidental_candidate, as: "vice_presidental_candidate" },
    ],
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  return result;
};

const getAll = async (req) => {
  const result = await Candidate_pair_number.findAll({
    include: [
      { model: Presidental_candidate, as: "presidental_candidate" },
      { model: Vice_presidental_candidate, as: "vice_presidental_candidate" },
    ],
    order: [["number", "ASC"]],
  });

  return result;
};

const update = async (req) => {
  await getOne(req);

  const checkPresidentalExist = await Presidental_candidate.findOne({
    where: { id: req.body.presidental_candidate_id },
  });

  if (!checkPresidentalExist) {
    throw ApiError.notFound("Presidental not found!");
  }

  const checkVicePresidentalExist = await Vice_presidental_candidate.findFirst({
    where: { id: req.body.vice_presidental_candidate_id },
  });

  if (!checkVicePresidentalExist) {
    throw ApiError.notFound("Vice presidental not found!");
  }

  const result = await Candidate_pair_number.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  return result;
};

const destroy = async (req) => {
  await getOne(req);

  const result = await Candidate_pair_number.destroy({
    where: { id: req.params.id },
  });

  return result;
};

module.exports = { create, getOne, update, getAll, destroy };
