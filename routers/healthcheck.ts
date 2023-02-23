import express from 'express';
import sequelize from '../database';

const healthcheck:express.Router = express.Router();

healthcheck.get('/ping', async (request:express.Request, response:express.Response, next:express.NextFunction) => {
  try {
    await sequelize.authenticate();
    response.statusCode = 200;
    return response.json({ status: 'Service is up and running. DB connected succesfully.' });
  } catch (error) {
    return next(error);
  }
});

export default healthcheck;
