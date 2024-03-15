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
        encrypted_candidate_number_id: encrypt(req.body.candidate_number_id),
      },
      { transaction }
    );

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

  // const finalResult = result.map((data) => {
  //   return {
  //     user_id: decrypt(data.encrypted_user_id),
  //     candidate_number_id: decrypt(data.encrypted_candidate_number_id),
  //   };
  // });

  return result;
};

const getOne = async (req) => {
  const result = await Voting_log.findOne({ where: { id: req.params.id } });

  return result;
};

module.exports = { create, getAll, getOne };
