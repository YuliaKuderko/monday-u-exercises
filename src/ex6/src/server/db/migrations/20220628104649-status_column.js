'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'Items',
      'status', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: false
    })
  },

  async down(queryInterface) {
    return queryInterface.removeColumn(
      'Items',
      'status'
    );
  }
};
