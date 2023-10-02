require('dotenv').config();
const log = require('../utils/winston');
const connection = require('../config/config');

connection.authenticate().then(() => {
  log.loggerInfo.info('Successful connection to MySQL database');
}).catch((err) => {
  log.loggerError.error('Error connecting to database:', err);
});