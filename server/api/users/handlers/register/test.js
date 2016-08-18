import request from 'supertest';
import { describe, it, before, after } from 'mocha';

import app from '~/index';
import User from '~/models/user';

describe('API Users - Register', function() {
  const dummyUserEmail = 'example@example.com';
  const dummyUserPassword = '12345';

  before((done) => {
    const testUser = new User();

    testUser.local.email = dummyUserEmail;
    testUser.local.password = testUser.generateHash(dummyUserPassword);

    testUser.save().then(() => {
      done();
    });
  });

  after((done) => {
    User.remove({}).then(() => {
      done();
    });
  });

  it('should not be able to register a new user with existing email', function(done) {
    request(app)
    .post('/api/users/register')
    .send({
      email: dummyUserEmail,
      password: '123456'
    })
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should be able to register a new user', function(done) {
    request(app)
    .post('/api/users/register')
    .send({
      email: 'example2@example.com',
      password: '123456'
    })
    .expect(200)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to register a new user without password', function(done) {
    request(app)
    .post('/api/users/register')
    .send({
      email: 'example2@example.com'
    })
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to register a new user without email', function(done) {
    request(app)
    .post('/api/users/register')
    .send({
      password: '123456'
    })
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });
});
