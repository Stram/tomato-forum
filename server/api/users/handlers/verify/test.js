import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, beforeEach, afterEach } from 'mocha';

import app from '~/index';
import User from '~/models/user';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

describe('API Users - Verify', function() {
  const dummyUserEmail = 'example@example.com';
  const dummyUserPassword = '12345';
  const dummyUserUsername = 'Username';
  let dummyUserToken;
  let dummyUserId;

  const dummyUser2Email = 'example2@example.com';
  const dummyUser2Password = '12345';
  const dummyUser2Username = 'Username2';

  beforeEach((done) => {
    const testUser = new User();

    testUser.local.email = dummyUserEmail;
    testUser.local.password = testUser.generateHash(dummyUserPassword);

    const saveTestUser = testUser.save();

    const testUser2 = new User();

    testUser2.local.email = dummyUser2Email;
    testUser2.local.password = testUser2.generateHash(dummyUser2Password);
    testUser2.username = dummyUser2Username;

    const saveTestUser2 = testUser2.save();

    Promise.all([saveTestUser, saveTestUser2]).then(([user]) => {
      dummyUserToken = user.get('token');
      dummyUserId = user.get('id');
      done();
    });
  });

  afterEach((done) => {
    User.remove({}).then(() => {
      done();
    });
  });

  it('should be able to verify a user', function(done) {
    request(app)
    .post('/api/users/verify')
    .send({
      username: dummyUserUsername,
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

  it('should not be able to verify a user with wrong token', function(done) {
    request(app)
    .post('/api/users/verify')
    .send({
      username: dummyUserUsername,
      userId: dummyUserId,
      token: ''
    })
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to verify a user with wrong user id', function(done) {
    request(app)
    .post('/api/users/verify')
    .send({
      username: dummyUserUsername,
      userId: objectId('3'),
      token: dummyUserToken
    })
    .expect(404)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to verify a user with wrong username', function(done) {
    request(app)
    .post('/api/users/verify')
    .send({
      username: '',
      userId: dummyUserId,
      token: dummyUserToken
    })
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to verify a user with already existing username', function(done) {
    request(app)
    .post('/api/users/verify')
    .send({
      username: dummyUser2Username,
      userId: dummyUserId,
      token: dummyUserToken
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
