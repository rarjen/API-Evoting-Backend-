"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Supporting_party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      Supporting_party.belongsTo(models.Political_party, {
        foreignKey: "political_party_id",
        as: "political_party",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Supporting_party.belongsTo(models.Candidate_pair_number, {
        foreignKey: "candidate_pair_number_id",
        as: "number",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Supporting_party.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      candidate_pair_number_id: DataTypes.STRING,
      political_party_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Supporting_party",
    }
  );
  return Supporting_party;
};
