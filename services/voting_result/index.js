const ApiError = require("../../helpers/errorHandler");
const {
  Voting_result,
  Candidate_pair_number,
  Presidental_candidate,
  Vice_presidental_candidate,
} = require("../../models");

const create = async (req) => {
  req.body.total_vote = 0;
  req.body.percentage = 0;

  const checkNumberExist = await Candidate_pair_number.findOne({
    where: { id: req.body.candidate_pair_number_id },
  });

  if (!checkNumberExist) {
    throw ApiError.notFound("Data candidate tidak ditemukan");
  }

  const result = await Voting_result.create(req.body);

  return result;
};

const getAll = async (req) => {
  const arrayResponse = [];
  const result = await Voting_result.findAll({
    include: {
      model: Candidate_pair_number,
      as: "number",
      include: [
        { model: Presidental_candidate, as: "presidental_candidate" },
        { model: Vice_presidental_candidate, as: "vice_presidental_candidate" },
      ],
    },
    order: [["total_vote", "ASC"]],
  });

  arrayResponse.push(result);

  const modifiedResults = arrayResponse.map((result) => ({
    id: result.id,
    candidate_pair_number_id: result.candidate_pair_number_id,
    total_vote: result.total_vote,
    percentage: result.percentage,
    number: result.number.number,
    img_result: result.number.img_url,
    presidental_name: result.number.presidental_candidate.name,
    vice_presidental_name: result.number.vice_presidental_candidate.name,
  }));

  return modifiedResults;
};

const getOne = async (req) => {
  const result = await Voting_result.findOne({
    where: { candidate_pair_number_id: req.params.candidate_pair_number_id },
  });

  if (!result) {
    throw ApiError.notFound("Data tidak ditemukan");
  }

  return result;
};

const update = async (req) => {
  await getOne(req);
  const result = await Voting_result.update(req.body, {
    where: { candidate_pair_number_id: req.params.candidate_pair_number_id },
  });

  return result;
};

const destroy = async (req) => {
  await getOne(req);
  const result = await Voting_result.destroy({
    where: { candidate_pair_number_id: req.params.candidate_pair_number_id },
  });

  return result;
};

module.exports = {
  create,
  update,
  destroy,
  getAll,
  getOne,
};
