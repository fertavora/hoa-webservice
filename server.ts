import dotenv from 'dotenv'; 
import logger from './utils/logger';

dotenv.config();

const port:any = process.env.PORT || process.env.API_PORT;

import app from './app'; 

app.listen(port, () => {
  logger.info(`Express server is started at port ${port}.`);
});

// todo models for consorcio
// todo write logs to kibana docker