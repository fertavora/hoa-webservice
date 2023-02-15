import dotenv from 'dotenv'; 
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user';

dotenv.config();
const jwtSecret:string|undefined = process.env.JWT_SECRET;

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

export default passport;