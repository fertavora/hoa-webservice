import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import logger from '../utils/logger';

const register:express.Router = express.Router();

register.post(
  '/register',
  body('username').isString(),
  body('password').isString(),
  body('firstName').isString(),
  body('lastName').isString(),
  body('email').isEmail(),
  async (request:express.Request, response:express.Response, next:express.NextFunction) => { 
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      response.statusCode = 400
      return response.json({ errors: errors.array() });
    }

    const { username, password, firstName, lastName, email } = request.body;
    logger.info(`Registering user ${username}`);
    const checkUserExists = await User.findOne({ where: { username } });
    
    if (checkUserExists) {
      logger.error('User not registered. Already exists.');
      response.status(400).json({message: `${username} already exists`});
    } else {
      try {
        const savedUser = await User.create({ username, password, firstName, lastName, email });

        if (savedUser) {
          logger.info(`User ${username} successfully registered`);
          response.statusCode = 200;
          return response.json({ message: "Thanks for registering" });
        }
      } catch (error) {
        return next(error);
      }
    }
});

export default register;
