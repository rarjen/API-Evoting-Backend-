"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Candidate_pair_numbers", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      presidental_candidate_id: {
        type: Sequelize.STRING,
      },
      vice_presidental_candidate_id: {
        type: Sequelize.STRING,
      },
      number: {
        type: Sequelize.INTEGER,
      },
      img_url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Candidate_pair_numbers");
  },
};
