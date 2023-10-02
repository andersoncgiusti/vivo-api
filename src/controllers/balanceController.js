/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const log = require('../utils/winston');
const Balance = require('../models/balanceModel');

router.post('/balance', async (req, res) => {
  try {
    const {
      value,
    } = req.body;

    const newBalance = await Balance.create({
      value,
    });

    const successMessage = 'POST /balance success';
    log.loggerHttp.http(successMessage);

    return res.status(201).json({
      Message: successMessage,
      Success: true,
      Results: newBalance,
    });
  } catch (err) {
    const errorMessage = 'POST /balance error';
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.get('/balance', async (req, res) => {
  try {
    const getBalance = await Balance.findAll();

    const successMessage = 'GET /balance success';
    log.loggerHttp.http(successMessage);

    return res.status(201).json({
      Message: successMessage,
      Success: true,
      Results: getBalance,
    });
  } catch (err) {
    const errorMessage = 'GET /balance error';
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.get('/balance/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getBalance = await Balance.findByPk(id);

    if (!getBalance) {
      return res.status(404).json({
        Message: `Balance with ID ${id} not found`,
        Success: false,
      });
    }

    const successMessage = `GET /balance/${id} success`;
    log.loggerHttp.http(successMessage);

    return res.status(200).json({
      Message: successMessage,
      Success: true,
      Results: getBalance,
    });
  } catch (err) {
    const errorMessage = `GET /balance/${id} error`;
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.put('/balance/:id', async (req, res) => {
  try {
    const {
      value,
      updated_at,
    } = req.body;

    const { id } = req.params;

    const existingBalance = await Balance.findByPk(id);

    if (!existingBalance) {
      return res.status(404).json({
        Message: `Balance with ID ${id} not found`,
        Success: false,
      });
    }

    existingBalance.value = value;
    existingBalance.updated_at = updated_at;

    await existingBalance.save();

    const successMessage = `PUT /balance/${id} success`;
    log.loggerHttp.http(successMessage);

    return res.status(200).json({
      Message: successMessage,
      Success: true,
      Results: existingBalance,
    });
  } catch (err) {
    const errorMessage = `PUT /balance/${id} error`;
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.delete('/balance/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingBalance = await Balance.findByPk(id);

    if (!existingBalance) {
      return res.status(404).json({
        Message: `Balance with ID ${id} not found`,
        Success: false,
      });
    }

    await existingBalance.destroy();

    const successMessage = `DELETE /balance/${id} success`;
    log.loggerHttp.http(successMessage);

    return res.status(200).json({
      Message: successMessage,
      Success: true,
      Results: existingBalance,
    });
  } catch (err) {
    const errorMessage = `DELETE /balance/${id} error`;
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

module.exports = (app) => {
  app.use('/api', router);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
