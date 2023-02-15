import express from 'express';
import register from './routers/register';
import login from './routers/login';
import data from './routers/data';

const api:express.Router = express.Router();

api.use(register);
api.use(login);
api.use(data);

export default api;