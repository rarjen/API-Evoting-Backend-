"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voting_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Voting_log.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      encrypted_user_id: DataTypes.TEXT,
      encrypted_candidate_number_id: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Voting_log",
    }
  );
  return Voting_log;
};
