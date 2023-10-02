const Sequelize = require('sequelize');
const connection = require('../config/config');
const log = require('../utils/winston');

const Balance = connection.define('Balance', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  value: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true,
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: true,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updated_at: {
    type: Sequelize.DATE,
    allowNull: true,
  },
}, {
  tableName: 'balance',
  timestamps: false,
});


Balance.sync()
  .then(() => {
    log.loggerInfo.info('Table "Balance" created successfully.');
  })
  .catch((error) => {
    log.loggerError.error('Error creating table "Balance":', error);
  });


module.exports = Balance;
