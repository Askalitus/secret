'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('links', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        length: 32,
      },
      message: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      willdeleteat: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      watchingall: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      watchingnow: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },
};
