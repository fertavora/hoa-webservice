import express from 'express';
import { faker } from '@faker-js/faker';

import isAuthenticated from '../middleware/isAuthenticated';

const companies:express.Router = express.Router();

companies.get('/', isAuthenticated, (request:express.Request, response:express.Response) => {
  const fakeCompany = {
    companyName: faker.company.name() ,
    companySuffix: faker.company.companySuffix(),
  }

  response.status(200).json(fakeCompany);
});

export default companies;
