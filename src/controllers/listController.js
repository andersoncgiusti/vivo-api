/* eslint-disable camelcase */
const express = require('express');

const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');
const log = require('../utils/winston');
const List = require('../models/listModel');

router.post('/list', async (req, res) => {
  try {
    const {
      description,
      value,
    } = req.body;

    const newList = await List.create({
      description,
      value,
    });

    const successMessage = 'POST /list success';
    log.loggerHttp.http(successMessage);

    return res.status(201).json({
      Message: successMessage,
      Success: true,
      Results: newList,
    });
  } catch (err) {
    const errorMessage = 'POST /list error';
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.get('/list', async (req, res) => {
  try {
    const getList = await List.findAll();

    const successMessage = 'GET /list success';
    log.loggerHttp.http(successMessage);

    return res.status(201).json({
      Message: successMessage,
      Success: true,
      Results: getList,
    });
  } catch (err) {
    const errorMessage = 'GET /list error';
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.get('/list/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const getList = await List.findByPk(id);

    if (!getList) {
      return res.status(404).json({
        Message: `List with ID ${id} not found`,
        Success: false,
      });
    }

    const successMessage = `GET /list/${id} success`;
    log.loggerHttp.http(successMessage);

    return res.status(200).json({
      Message: successMessage,
      Success: true,
      Results: getList,
    });
  } catch (err) {
    const errorMessage = `GET /list/${id} error`;
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.put('/list/:id', async (req, res) => {
  try {
    const {
      description,
      value,
      updated_at,
    } = req.body;

    const { id } = req.params;

    const existingList = await List.findByPk(id);

    if (!existingList) {
      return res.status(404).json({
        Message: `List with ID ${id} not found`,
        Success: false,
      });
    }

    existingList.description = description;
    existingList.value = value;
    existingList.updated_at = updated_at;

    await existingList.save();

    const successMessage = `PUT /list/${id} success`;
    log.loggerHttp.http(successMessage);

    return res.status(200).json({
      Message: successMessage,
      Success: true,
      Results: existingList,
    });
  } catch (err) {
    const errorMessage = `PUT /list/${id} error`;
    log.loggerError.http(errorMessage);
    return res.status(500).json({
      Message: errorMessage,
      Success: false,
      Results: err.message,
    });
  }
});

router.delete('/list/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const existingList = await List.findByPk(id);

    if (!existingList) {
      return res.status(404).json({
        Message: `List with ID ${id} not found`,
        Success: false,
      });
    }

    await existingList.destroy();

    const successMessage = `DELETE /list/${id} success`;
    log.loggerHttp.http(successMessage);

    return res.status(200).json({
      Message: successMessage,
      Success: true,
      Results: existingList,
    });
  } catch (err) {
    const errorMessage = `DELETE /list/${id} error`;
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
