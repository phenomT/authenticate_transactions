'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NetPos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  NetPos.init({
    amount: DataTypes.FLOAT,
    payer_account_name: DataTypes.STRING,
    channel: DataTypes.STRING,
    payer_account_bvn: DataTypes.STRING,
    type: DataTypes.STRING,
    paid_at: DataTypes.DATE,
    payer_bank_code: DataTypes.STRING,
    recipient_account_number: DataTypes.STRING,
    payer_account_number: DataTypes.STRING,
    details: DataTypes.STRING,
    transaction_reference: DataTypes.STRING,
    merchantId: DataTypes.STRING,
    tId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'NetPos',
  });
  return NetPos;
};