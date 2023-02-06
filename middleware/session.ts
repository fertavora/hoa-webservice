import { Request, Response, NextFunction } from 'express';
import session from 'express-session';

const sessionMiddleware = (request:Request, response:Response, next:NextFunction) => {
  return session({
    secret: 'campeondelmundo',
    // cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
    // name: 'SessionId'
  })(request, response, next);
}

export default sessionMiddleware;
