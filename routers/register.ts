import express from 'express';
import User from '../models/user';
import logger from '../utils/logger';

const register:express.Router = express.Router();

register.post('/register', async (request:express.Request, response:express.Response) =>{
  const { username, password } = request.body;
  logger.info(`Registering user ${username}`);
  const checkUserExists = await User.findOne({ where: { username } });
  
  if (checkUserExists) {
    logger.error('User not registered. Already exists.');
    response.status(400).json({message: `${username} already exists`});
  } else {
    const savedUser = await User.create({ username, password });

    if (savedUser) {
      logger.info(`User ${username} successfully registered`);
      response.json({ message: "Thanks for registering" });
    }
  }
});

export default register;
