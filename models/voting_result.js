"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voting_result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Voting_result.belongsTo(models.Candidate_pair_number, {
        foreignKey: "candidate_pair_number_id",
        as: "number",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Voting_result.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      candidate_pair_number_id: DataTypes.STRING,
      total_vote: DataTypes.INTEGER,
      percentage: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "Voting_result",
    }
  );
  return Voting_result;
};
