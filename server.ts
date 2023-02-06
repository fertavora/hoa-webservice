import express from 'express';

import companies from './routers/companies';
import employees from './routers/employees';
import auth from './routers/auth';

import apiLogger from './middleware/apiLogger';
import sessionMiddleware from './middleware/session';
import passport from './middleware/passport';

const app = express();
const hostname:string = '127.0.0.1';
const port:number = 5000;

app.use(express.json());
app.use(sessionMiddleware);
app.use(apiLogger);
app.use(passport.initialize());
app.use(passport.session());

app.use('/companies', companies);
app.use('/employees', employees);
app.use('/auth', auth);

app.post('/login', (request:express.Request, response:express.Response, next:express.NextFunction) => {
  passport.authenticate('local', (error, user, info) => {
    if(!user) return response.status(401).json({ message: "Not Authorized"});
    request.login(user, (error) => {
      if (error) throw error;
      response.status(200).json(user);
    })
  })(request, response, next);  
  }
);

app.get('/healthcheck', (request:express.Request, response:express.Response) => {
  const healthCheckResponse = {
    status: "up"
  }
  response.status(200).json(healthCheckResponse);
});

app.listen(port, hostname, () => {
  console.info(`Express server is started at ${hostname}:${port}.`);
});