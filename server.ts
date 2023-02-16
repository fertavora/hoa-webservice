import dotenv from 'dotenv'; 
import express from 'express';
import api from './api';

dotenv.config();

const host:any = process.env.API_HOST;
const port:any = process.env.API_PORT;

const app = express();
app.use(express.json());
app.use('/api/v1', api);
app.listen(port, host, () => {
  console.info(`Express server is started at ${host}:${port}.`);
});


// reference: https://github.com/ipenywis/express-login-register-api
// todo change to postgre docker db https://github.com/docker-library/docs/blob/master/postgres/README.md
// todo review loggin of db
// todo add morgan or other loggin https://www.npmjs.com/package/morgan
// todo review cors and helmet
// todo create heroku account and deploy
// todo models for consorcio
// todo rename and sync repo
