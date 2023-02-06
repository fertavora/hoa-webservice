import express from 'express';
import logger from './logger';

const apiLogger = (request:express.Request, response:express.Response, next:express.NextFunction) => {
  const { method, url, body } = request;
  // if (request.session) {
  //   response.setHeader('SessionId', request.session.id);
  // }

  logger.info(`${method} ${url}`);
  
  if (method === 'POST') {
    logger.info(`Request body: ${JSON.stringify(body)}`);
  }

  next();
};

export default apiLogger;
