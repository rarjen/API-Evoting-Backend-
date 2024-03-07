"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Presidental_candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Presidental_candidate.belongsTo(models.Political_party, {
        foreignKey: "political_party_id",
        as: "political_party",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Presidental_candidate.hasOne(models.Candidate_pair_number, {
        foreignKey: "presidental_candidate_id",
        as: "number",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Presidental_candidate.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      political_party_id: DataTypes.STRING,
      name: DataTypes.STRING,
      age: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      dob: DataTypes.STRING,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Presidental_candidate",
    }
  );
  return Presidental_candidate;
};
