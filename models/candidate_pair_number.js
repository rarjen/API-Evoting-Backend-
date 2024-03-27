"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Candidate_pair_number extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Candidate_pair_number.belongsTo(models.Presidental_candidate, {
        foreignKey: "presidental_candidate_id",
        as: "presidental_candidate",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Candidate_pair_number.belongsTo(models.Vice_presidental_candidate, {
        foreignKey: "vice_presidental_candidate_id",
        as: "vice_presidental_candidate",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Candidate_pair_number.hasOne(models.Supporting_party, {
        foreignKey: "candidate_pair_number_id",
        as: "supporting_party",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Candidate_pair_number.hasOne(models.Voting_result, {
        foreignKey: "candidate_pair_number_id",
        as: "voting_result",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Candidate_pair_number.hasMany(models.Candidate_mission, {
        foreignKey: "candidate_id",
        as: "candidate_mission",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Candidate_pair_number.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      presidental_candidate_id: DataTypes.STRING,
      vice_presidental_candidate_id: DataTypes.STRING,
      number: DataTypes.INTEGER,
      img_url: DataTypes.STRING,
      visi: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Candidate_pair_number",
    }
  );
  return Candidate_pair_number;
};
