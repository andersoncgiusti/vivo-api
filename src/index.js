/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();

const express = require('express');
const http = require('http');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const portfinder = require('portfinder');

const log = require('./utils/winston');
const swaggerDocument = require('../swagger.json');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Running' });
});

const options = {
  swaggerDefinition: swaggerDocument,
  apis: ['./controllers/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

require('./controllers/index')(app);
require('./database/db');

(async () => {
  try {
    const port = await portfinder.getPortPromise({ port: 3000 });
    server.listen(port, () => {
      log.loggerInfo.info(`Server online url http://localhost:${port}`);
      log.loggerInfo.info(`Document online url http://localhost:${port}/api-docs`);
    });
  } catch (err) {
    log.loggerError.error('No available port');
  }
})();

module.exports = server;
