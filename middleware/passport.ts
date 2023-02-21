import dotenv from 'dotenv'; 
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';
import logger from '../utils/logger';

dotenv.config();
const jwtSecret:string|undefined = process.env.JWT_SECRET;

passport.use(new LocalStrategy(async (username:string, password:string, done:Function) => {
  try{
    logger.info(`Loging in user ${username}...`);
    const checkUserExists:any = await User.findOne({ where: { username } });
    if(checkUserExists === null) {
      logger.error(`Error logging user ${username}. Not found.`);
      return done(null, false);
    }
    if(checkUserExists.password === password) {
      return done(null, checkUserExists);
    } else {
      logger.error(`Error logging user ${username}. Wrong password.`);
      return done(null, false);
    }
  } catch(error) {
    logger.error(`Error logging user ${username}`);
    return done(error);
  }
}));

const jwtOptions:any = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload:any, done:Function) => {
  try {
    logger.info(`Checking bearer token...`);
    const { username } = jwtPayload;
    const checkUserExists = await User.findOne({ where: { username } });
    if(checkUserExists === null) {
      logger.error(`Error checking bearer token. User not found.`);
      return done(null, false);
    } else {
      logger.info(`Bearer token is OK.`);
      return done(null, checkUserExists);
    }
  } catch(error) {
    logger.error(`Error checking bearer token...`);
    return done(error);
  }
}));

export default passport;