import dotenv from 'dotenv'; 
import express from 'express';
import api from './api';
import morgan from 'morgan';

dotenv.config();

const host:any = process.env.API_HOST;
const port:any = process.env.API_PORT;

const app = express();
app.use(express.json());

const morganFormat:string = ':date[iso] - :method :url - :status :response-time ms';
app.use(morgan(morganFormat));

app.use('/api/v1', api);
app.listen(port, host, () => {
  console.info(`Express server is started at ${host}:${port}.`);
});

// todo review cors and helmet
// todo create heroku account and deploy
// todo models for consorcio
// todo add id to each request ref: https://github.com/expressjs/morgan#use-custom-token-formats
// todo add winston to log info