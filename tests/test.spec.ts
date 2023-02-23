import request from 'supertest';
import assert from 'assert';

import app from '../app';

describe('HOA Webservice', () => {
  let access_token:string;
  it('Healthcheck', async () => {
    const response = await request(app)
      .get('/api/v1/ping');
    assert.equal(response.status, 200);
    assert.equal(response.body.status, 'Service is up and running. DB connected succesfully.');
  });

  it('Register new user', async () => {
    const response = await request(app)
      .post('/api/v1/register')
      .send({ "username": "admin", "password": "nimda"});
    assert.equal(response.headers["content-type"].includes('application/json'), true);
    assert.equal(response.status, 200);
    assert.equal(response.body.message, 'Thanks for registering');
  });

  it('Login in', async () => {
    const response = await request(app)
      .post('/api/v1/login')
      .send({ "username": "admin", "password": "nimda"});
    assert.equal(response.headers["content-type"].includes('application/json'), true);
    assert.equal(response.status, 200);
    assert.equal(response.body.message, 'Welcome admin!');
    assert.equal(response.body.access_token === null, false);
    access_token = response.body.access_token;
  });

  it('Read data', async () => {
    const response = await request(app)
      .get('/api/v1/data')
      .set('Authorization', `Bearer ${access_token}`)
      .send({ "username": "admin", "password": "nimda"});
    assert.equal(response.headers["content-type"].includes('application/json'), true);
    assert.equal(response.status, 200);
    assert.equal(response.body.message, 'Get data');
  });
});