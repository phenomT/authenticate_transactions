'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('NetPos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.FLOAT
      },
      payer_account_name: {
        type: Sequelize.STRING
      },
      channel: {
        type: Sequelize.STRING
      },
      payer_account_bvn: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      paid_at: {
        type: Sequelize.DATE
      },
      payer_bank_code: {
        type: Sequelize.STRING
      },
      recipient_account_number: {
        type: Sequelize.STRING
      },
      payer_account_number: {
        type: Sequelize.STRING
      },
      details: {
        type: Sequelize.STRING
      },
      transaction_reference: {
        type: Sequelize.STRING
      },
      merchantId: {
        type: Sequelize.STRING
      },
      tId: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('NetPos');
  }
};