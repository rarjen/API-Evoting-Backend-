const { Voting_result, Voting_log, User, sequelize } = require("../../models");
const { encrypt, decrypt } = require("../../helpers/encryption");
const ApiError = require("../../helpers/errorHandler");

const create = async (req) => {
  const user = req.user;
  const transaction = await sequelize.transaction();
  try {
    const checkIsVoted = await User.findOne({
      where: { id: user.id },
      transaction,
    });

    if (checkIsVoted.isVoted === 1) {
      throw ApiError.badRequest("Anda sudah melakukan vote!");
    }

    const result = await Voting_log.create(
      {
        encrypted_user_id: encrypt(user.id),
        encrypted_candidate_number_id: req.body.candidate_number_id,
      },
      { transaction }
    );

    await Voting_result.increment("total_vote", {
      by: 1,
      where: {
        candidate_pair_number_id: decrypt(req.body.candidate_number_id),
      },
      transaction,
    });

    // Get total votes for all candidates
    const totalVotes = await Voting_result.sum("total_vote", {
      where: {},
      transaction,
    });

    // Calculate percentage for each candidate
    const results = await Voting_result.findAll({
      where: {},
      transaction,
    });

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      const percentage = (result.total_vote / totalVotes) * 100;

      await result.update({ percentage }, { transaction });
    }

    await User.update({ isVoted: 1 }, { where: { id: user.id }, transaction });

    await transaction.commit();
    return result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getAll = async (req) => {
  const result = await Voting_log.findAll({});
  return result;
};

const getOne = async (req) => {
  const result = await Voting_log.findOne({ where: { id: req.params.id } });

  return result;
};

module.exports = { create, getAll, getOne };
