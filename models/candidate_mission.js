"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Candidate_mission extends Model {
    static associate(models) {
      Candidate_mission.belongsTo(models.Candidate_pair_number, {
        foreignKey: "candidate_id",
        as: "candidate_pair_number",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Candidate_mission.init(
    {
      candidate_id: DataTypes.STRING,
      mission: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Candidate_mission",
    }
  );
  return Candidate_mission;
};
