import dotenv from 'dotenv'; 
import express from 'express';
import { DataTypes, Sequelize } from 'sequelize';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';

dotenv.config();

// DB SET UP
const sequelize = new Sequelize('sqlite::memory:');

sequelize.sync();

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

const host:any = process.env.API_HOST;
const port:any = process.env.API_PORT;
const jwtSecret:any = process.env.JWT_SECRET;
// (async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// })();


// PASSPORT SETUP - LOCAL

passport.use(new LocalStrategy(async (username:string, password:string, done:Function) => {
  try{
    const checkUserExists:any = await User.findOne({ where: { username } });
    if(checkUserExists === null) {
      return done(null, false);
    }
    if(checkUserExists.password === password) {
      return done(null, checkUserExists);
    } else {
      return done(null, false);
    }
  } catch(error) {
    return done(error);
  }
}));

// PASSPORTS SETUP - JWT
const jwtOptions:any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload:any, done:Function) => {
  try {
    const { username } = jwtPayload;
    const checkUserExists = await User.findOne({ where: { username } });
    if(checkUserExists === null) {
      return done(null, false);
    } else {
      return done(null, checkUserExists);
    }
  } catch(error) {
    return done(error);
  }
}));

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