const ApiError = require("../../helpers/errorHandler");
const { Voting_result, Candidate_pair_number } = require("../../models");

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
  const result = await Voting_result.findAll({});

  return result;
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
