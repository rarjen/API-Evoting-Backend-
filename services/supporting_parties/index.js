const ApiError = require("../../helpers/errorHandler");
const {
  Policital_party,
  Candidate_pair_number,
  Supporting_party,
} = require("../../models");

const checkPartyId = async (parties) => {
  for (const dataParty of parties) {
    const partyExist = await Policital_party.findOne({
      where: {
        id: dataParty,
      },
    });

    if (!partyExist) {
      throw ApiError.notFound("Data partai tidak ditemukan!");
    }
  }
};

const create = async (req) => {
  const { candidateNumber, partiesId } = req.body;
  let finalResult = [];

  await checkPartyId(partiesId);
  const checkCandidateNumber = await Candidate_pair_number.findOne({
    where: { id: candidateNumber },
  });

  if (!checkCandidateNumber) {
    throw ApiError.notFound("Data nomor kandidat tidak ditemukan!");
  }

  for (const dataPartyId of partiesId) {
    const result = await Supporting_party.create({
      candidate_pair_number_id: candidateNumber,
      political_party_id: dataPartyId,
    });
    finalResult.push(result);
  }

  return finalResult;
};

const getOne = async (req) => {
  const result = await Supporting_party.findOne({
    where: { id: req.params.id },
    include: [
      { model: Policital_party, as: "political_party" },
      { model: Candidate_pair_number, as: "number" },
    ],
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  return result;
};

const getAll = async (req) => {
  let whereQuery = {};

  if (req.query.candidate_pair_number_id) {
    whereQuery = {
      candidate_pair_number_id: req.query.candidate_pair_number_id,
    };
  }

  if (req.query.political_party_id) {
    whereQuery = {
      political_party_id: req.query.political_party_id,
    };
  }

  const result = await Supporting_party.findAll({
    where: whereQuery,
    include: [
      { model: Policital_party, as: "political_party" },
      { model: Candidate_pair_number, as: "number" },
    ],
  });

  return result;
};

const update = async (req) => {
  const { candidateNumber, partiesId } = req.body;
  await getOne(req);

  const checkCandidateNumber = await Candidate_pair_number.findOne({
    where: { id: candidateNumber },
  });

  if (!checkCandidateNumber) {
    throw ApiError.notFound("Data nomor kandidat tidak ditemukan!");
  }

  const checkParty = await Policital_party.findOne({
    where: { id: partiesId },
  });

  if (!checkParty) {
    throw ApiError.notFound("Data partai politik tidak ditemukan!");
  }

  const result = await Supporting_party.update(
    {
      candidate_pair_number: candidateNumber,
      political_party_id: partiesId,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );

  return result;
};

const destroy = async (req) => {
  await getOne(req);

  const result = await Supporting_party.destroy({
    where: { id: req.params.id },
  });

  return result;
};

module.exports = { create, getOne, update, getAll, destroy };
