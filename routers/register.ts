import express from 'express';
import User from '../models/user';

const register:express.Router = express.Router();

register.post('/register', async (request:express.Request, response:express.Response) =>{
  const { username, password } = request.body;
  const checkUserExists = await User.findOne({ where: { username } });
  
  if (checkUserExists) {
    response.status(400).json({message: `${username} already exists`});
  } else {
    const savedUser = await User.create({ username, password });

    if (savedUser) {
      response.json({ message: "Thanks for registering" });
    }
  }
});

export default register;
