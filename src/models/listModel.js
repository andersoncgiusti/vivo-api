const Sequelize = require('sequelize');
const connection = require('../config/config');
const log = require('../utils/winston');

const List = connection.define('List', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: Sequelize.STRING(255),
    allowNull: true,
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
  tableName: 'list',
  timestamps: false,
});


List.sync()
  .then(() => {
    log.loggerInfo.info('Table "List" created successfully.');
  })
  .catch((error) => {
    log.loggerError.error('Error creating table "List":', error);
  });

module.exports = List;
