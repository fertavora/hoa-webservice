import express from 'express';
import sequelize from '../database';

const healthcheck:express.Router = express.Router();

healthcheck.get('/ping', async (request:express.Request, response:express.Response) => {
  try {
    await sequelize.authenticate();
    response.send(200).json({ status: 'Service is up and running. DB connected succesfully.' });
  } catch (error) {
    response.send(500).json({ status: 'Service not available.' });
  }
});

export default healthcheck;
