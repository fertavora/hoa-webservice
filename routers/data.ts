import express from 'express';
import passport from '../middleware/passport';

const data:express.Router = express.Router();

data.get('/data', passport.authenticate('jwt', { session: false }), (request:express.Request, response:express.Response) =>{
  response.status(200).json({message:'Get data'});
});

export default data;