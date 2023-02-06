import express from 'express';
import { faker } from '@faker-js/faker';
import { body, header, validationResult } from 'express-validator';
import validateAPIKey from '../middleware/apiKeyValidator';
import logger from '../middleware/logger';

const employees:express.Router = express.Router();

employees.get('/',
  // validateAPIKey(), 
  (request:express.Request, response:express.Response) => {
    logger.info(request.isAuthenticated());
    const fakeEmployee = {
      name: faker.name.firstName(),
      lastName: faker.name.lastName(),
    }
    response.status(200).json(fakeEmployee);
});

employees.post('/', 
  // validateAPIKey(),
  async (request:express.Request, response:express.Response, next:express.NextFunction) => {
    await body('name').not().isEmpty().withMessage('Name is required').run(request);
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      logger.error(errors.array()[0].msg);
      response.status(400).json({errors: errors.array()});
    } else {
      const newEmployee = request.body;
      logger.info(`200 OK`);
      response.status(200).json(newEmployee);
    }
});

export default employees;
