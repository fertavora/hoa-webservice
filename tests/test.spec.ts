import request from 'supertest';
import { expect } from 'chai';
import { faker } from '@faker-js/faker';

import app from '../app';

describe('HOA Webservice', () => {
  let access_token:string;
  it('Healthcheck', async () => {
    const response = await request(app)
      .get('/api/v1/ping');
    expect(response.status, 'Status code is wrong!').to.equal(200);
    expect(response.body.status).to.equal('Service is up and running. DB connected succesfully.');
  });

  it('Register new user', async () => {
    const newUser = {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
    }
    const response = await request(app)
        .post('/api/v1/register')
        .send(newUser);
      expect(response.headers["content-type"]).to.include('application/json');
      expect(response.status, 'Status code is wrong!').to.equal(200);
      expect(response.body.message).to.equal('Thanks for registering');
  });

  it.skip('Login in', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({ "username": "admin", "password": "nimda"});
    expect(response.headers["content-type"]).to.includes('application/json');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Welcome admin!');
    expect(response.body.access_token).to.not.be.null;
    access_token = response.body.access_token;
  });

  it.skip('Read data', async () => {
    const response = await request(app)
      .get('/api/v1/data')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ "username": "admin", "password": "nimda"});
    expect(response.headers["content-type"]).to.includes('application/json');
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Get data');
  });
});