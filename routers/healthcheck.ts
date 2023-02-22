import express from 'express';
import sequelize from '../database';

const healthcheck:express.Router = express.Router();

healthcheck.get('/ping', async (request:express.Request, response:express.Response, next:express.NextFunction) => {
  try {
    await sequelize.authenticate();
    response.send(200).json({ status: 'Service is up and running. DB connected succesfully.' });
    return;
  } catch (error) {
    return next(new Error(`Service not available: ${error}`));
  }
});

export default healthcheck;
