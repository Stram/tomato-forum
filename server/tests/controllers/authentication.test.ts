import * as request from 'supertest';
import 'mocha';

import app from 'index';
// import User from 'models/user';

describe('API Users - Register', function() {
  const dummyUserEmail = 'example@example.com';
  // const dummyUserPassword = '12345';

  // before(async function() {
  //   await User.create({
  //     email: dummyUserEmail,
  //     password: User.generateHash(dummyUserPassword)
  //   });
  // });
  //
  // after(async function() {
  //   // User.remove({}).then(() => {
  //   //   done();
  //   // });
  //   return Promise.resolve();
  // });

  it('should not be able to register a new user with existing email', function(done) {
    request(app)
    .post('/api/register')
    .send({
      email: dummyUserEmail,
      password: '123456'
    })
    .expect(400, done);
  });

  it('should be able to register a new user', function(done) {
    request(app)
    .post('/api/register')
    .send({
      email: 'example2@example.com',
      password: '123456'
    })
    .expect(200, done);
  });

  it('should not be able to register a new user without password', function(done) {
    request(app)
    .post('/api/register')
    .send({
      email: 'example2@example.com'
    })
    .expect(400, done);
  });

  it('should not be able to register a new user without email', function(done) {
    request(app)
    .post('/api/register')
    .send({
      password: '123456'
    })
    .expect(400, done);
  });
});
