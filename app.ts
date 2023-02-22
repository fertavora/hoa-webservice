import dotenv from 'dotenv'; 
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import api from './api';
import morgan, { morganFormat, addTraceIdHeader } from './middleware/morgan';
import logger from './utils/logger';

dotenv.config();

const nodeEnv:any = process.env.NODE_ENV;

const app = express();
app.use(express.json());

if(nodeEnv === 'production') {
  app.use(helmet());
  app.use(cors());
}

app.use(addTraceIdHeader);

const stream: morgan.StreamOptions = {
  write: (message) => logger.info(message),
};

app.use(morgan(morganFormat, { stream }));

app.use('/api/v1', api);

export default app;