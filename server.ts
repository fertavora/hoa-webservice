import dotenv from 'dotenv'; 
import logger from './utils/logger';

dotenv.config();

const host:any = process.env.API_HOST;
const port:any = process.env.PORT || process.env.API_PORT;

import app from './app'; 

app.listen(port, host, () => {
  logger.info(`Express server is started at ${host}:${port}.`);
});

// todo models for consorcio
// todo write logs to kibana docker