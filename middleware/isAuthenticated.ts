import express from 'express';

const isAuthenticated = (request:express.Request, response:express.Response, next:express.NextFunction) => {
  if (request.isAuthenticated()) {
    return next();
  }

  response.status(401).send('Unauthorized');
}

export default isAuthenticated;