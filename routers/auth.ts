import express from 'express';
import passport from 'passport';

const auth:express.Router = express.Router();

auth.post('/login', passport.authenticate('local'), (request:express.Request, response:express.Response) => {
  response.send(200);
});

export default auth;