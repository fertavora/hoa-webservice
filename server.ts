import dotenv from 'dotenv'; 
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import api from './api';
import morgan, { morganFormat, addTraceIdHeader } from './middleware/morgan';
import logger from './utils/logger';

dotenv.config();

const host:any = process.env.API_HOST;
const port:any = process.env.API_PORT;

const app = express();
app.use(express.json());

if(process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(cors());
}

app.use(addTraceIdHeader);

const stream: morgan.StreamOptions = {
  write: (message) => logger.info(message),
};

app.use(morgan(morganFormat, { stream }));

app.use('/api/v1', api);
app.listen(port, host, () => {
  logger.info(`Express server is started at ${host}:${port}.`);
});

// todo add supertest testing
// todo add ping healthcheck endpoint
// todo create heroku account and deploy
// todo models for consorcio
// todo write logs to kibana docker