import express from 'express';
import { header, validationResult, ValidationChain, Result } from 'express-validator';
import logger from './logger';

const validateAPIKey = () => {
  return async (request:express.Request, response:express.Response, next:express.NextFunction) => {
    const validations:ValidationChain[] = [
      header('api-key').not().isEmpty().withMessage('API Key header is required'),
      header('api-key').equals('54321').withMessage('API Key value is invalid.')
    ]
    
    for (let validation of validations) {
      const result:Result = await validation.run(request);
      if (!result.isEmpty()) break;
    }
    
    const errors = validationResult(request);
    if (errors.isEmpty()) {
      return next();
    }
    logger.error(errors.array()[0].msg);
    response.status(400).json({ errors: errors.array() });
  }

}

export default validateAPIKey;
