const ApiError = require("../../helpers/errorHandler");

const {
  Presidental_candidate,
  Vice_presidental_candidate,
  Candidate_pair_number,
  Supporting_party,
  Voting_result,
  Candidate_mission,
  Political_party,
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
    }),

    await Voting_result.create({ candidate_pair_number_id: result.id })
  );

  return result;
};

const getOne = async (req) => {
  let arrayMissions = [];
  let arrayImgParties = [];
  const result = await Candidate_pair_number.findOne({
    where: { id: req.params.id },
    include: [
      { model: Presidental_candidate, as: "presidental_candidate" },
      { model: Vice_presidental_candidate, as: "vice_presidental_candidate" },
      {
        model: Candidate_mission,
        as: "candidate_mission",
        order: [["id", "ASC"]],
      },
    ],
  });

  const getImgUrlParties = await Supporting_party.findAll({
    where: { candidate_pair_number_id: req.params.id },
    include: { model: Political_party, as: "political_party" },
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ada!");
  }

  getImgUrlParties.map((data) => {
    arrayImgParties.push(data.political_party.img_url);
  });

  result.candidate_mission.map((data) => {
    arrayMissions.push(data.mission);
  });

  const modifiedResult = {
    id: result.id,
    presidental_candidate_id: result.presidental_candidate_id,
    vice_presidental_candidate_id: result.vice_presidental_candidate_id,
    number: result.number,
    presidental_candidate_name: result.presidental_candidate.name,
    vice_presidental_candidate_name: result.vice_presidental_candidate.name,
    img_url: result.img_url,
    vision: result.visi,
    mission: arrayMissions,
    supportingParties: arrayImgParties,
  };

  return modifiedResult;
};

const getAll = async (req) => {
  let querySearch = {};

  if (req.query.number) {
    querySearch = {
      number: req.query.number,
    };
  }

  const result = await Candidate_pair_number.findAll({
    include: [
      { model: Presidental_candidate, as: "presidental_candidate" },
      { model: Vice_presidental_candidate, as: "vice_presidental_candidate" },
    ],
    where: querySearch,
    order: [["number", "ASC"]],
  });

  const modifiedResults = result.map((result) => ({
    id: result.id,
    presidental_candidate_id: result.presidental_candidate_id,
    vice_presidental_candidate_id: result.vice_presidental_candidate_id,
    number: result.number,
    presidental_candidate_name: result.presidental_candidate.name,
    vice_presidental_candidate_name: result.vice_presidental_candidate.name,
    img_url: result.img_url,
  }));

  return modifiedResults;
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
