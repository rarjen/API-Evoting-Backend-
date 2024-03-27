"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Candidate_pair_numbers", "visi", {
      type: Sequelize.TEXT,
    });

    await queryInterface.addColumn("Candidate_pair_numbers", "misi", {
      type: Sequelize.TEXT,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Candidate_pair_numbers", "visi");
    await queryInterface.removeColumn("Candidate_pair_numbers", "misi");
  },
};
