import dotenv from 'dotenv'; 
import express from 'express';
import passport from './middleware/passport';
import jwt from 'jsonwebtoken';
import User from './models/user';

dotenv.config();

const host:any = process.env.API_HOST;
const port:any = process.env.API_PORT;
const jwtSecret:any = process.env.JWT_SECRET;

// API SET UP
const app = express();

app.use(express.json());

app.get('/data', passport.authenticate('jwt', {session: false}), (request:express.Request, response:express.Response) =>{
  response.status(200).json({message:'Get data'});
});

app.post('/register', async (request:express.Request, response:express.Response) =>{
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

app.post('/login', passport.authenticate('local', {session: false}),async (request:express.Request, response:express.Response) =>{
  const { username } = request.body;
  // generate token here
  const jwtToken = jwt.sign(
    { username },
    jwtSecret, { expiresIn: '5m' }
  );
  response.status(200).json({message: `Welcome ${username}!`, access_token: jwtToken});
});

app.listen(port, host, () => {
  console.info(`Express server is started at ${host}:${port}.`);
});


// reference: https://github.com/ipenywis/express-login-register-api