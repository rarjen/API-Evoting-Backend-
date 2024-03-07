"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Political_party extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Political_party.hasOne(models.Presidental_candidate, {
        foreignKey: "political_party_id",
        as: "presidental_candidate",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Political_party.hasOne(models.Vice_presidental_candidate, {
        foreignKey: "political_party_id",
        as: "vice_presidental_candidate",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Political_party.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      abbreviation: DataTypes.STRING,
      description: DataTypes.TEXT,
      img_url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Political_party",
    }
  );
  return Political_party;
};
