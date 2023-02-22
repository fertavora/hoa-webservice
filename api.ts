import express from 'express';
import register from './routers/register';
import login from './routers/login';
import data from './routers/data';
import healthcheck from './routers/healthcheck';

const api:express.Router = express.Router();

api.use(register);
api.use(login);
api.use(data);
api.use(healthcheck);

export default api;