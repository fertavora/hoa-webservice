import express from 'express';
import passport from '../middleware/passport';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const login:express.Router = express.Router();

const jwtSecret:any = process.env.JWT_SECRET;

login.post('/login', passport.authenticate('local', { session: false }),async (request:express.Request, response:express.Response) =>{
  const { username } = request.body;
  logger.info(`Loging in user ${username}`);
  const jwtToken = jwt.sign(
    { username },
    jwtSecret, { expiresIn: '5m' }
  );
  logger.info(`User ${username} successfully logged in.`);
  response.status(200).json({message: `Welcome ${username}!`, access_token: jwtToken});
});

export default login;
