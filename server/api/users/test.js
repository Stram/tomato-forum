import request from 'supertest';
import app from '../../server';
import { describe, it, before } from 'mocha';

import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

import User from '../../models/user';

before(function(done) {
  mockgoose(mongoose).then(function() {
    mongoose.connect('', function(err) {
      done(err);
    });
  });
});

describe('API Users', function() {

  describe('Registration', function() {
    it('should be able to register a new user', function(done) {
      request(app)
      .post('/api/users/register')
      .send({
        email: 'stjepan.petrusa+test@gmail.com',
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
  });

  describe('Verification', function() {

    const dummyUserEmail = 'example@example.com';
    const dummyUserPassword = '12345';
    const dummyUserUsername = 'Username';
    let dummyUserToken;
    let dummyUserId;

    before((done) => {
      const testUser = new User();

      testUser.local.email = dummyUserEmail;
      testUser.local.password = testUser.generateHash(dummyUserPassword);

      testUser.save().then((user) => {
        dummyUserToken = user.get('token');
        dummyUserId = user.get('id');
        done();
      });
    });

    it('should be able to verify a new user', function(done) {
      request(app)
      .post('/api/users/verify')
      .send({
        username: dummyUserUsername,
        password: dummyUserPassword,
        userId: dummyUserId,
        token: dummyUserToken
      })
      .expect(200)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });
});
