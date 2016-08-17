import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';
import { expect } from 'chai';

import app from '../../index';
import User from '../../models/user';
import testHelpers from '../../test/helpers';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

describe('API Users', function() {

  describe('Registration', function() {
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

  describe('Verification', function() {
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

  describe('Login', function() {
    const dummyUserEmail = 'example@example.com';
    const dummyUserPassword = '12345';
    const dummyUserUsername = 'Username';

    const dummyUser2Email = 'example1234@example.com';
    const dummyUser2Password = 'password';
    const dummyUser2Username = 'Username234';
    const dummyUser2Token = '12345678901234567890';

    beforeEach((done) => {
      const testUser = new User();

      testUser.local.email = dummyUserEmail;
      testUser.local.password = testUser.generateHash(dummyUserPassword);
      testUser.username = dummyUserUsername;

      const saveTestUser = testUser.save();

      const testUser2 = new User();

      testUser2.local.email = dummyUser2Email;
      testUser2.local.password = testUser2.generateHash(dummyUser2Password);
      testUser2.username = dummyUser2Username;
      testUser2.token = dummyUser2Token;

      const saveTestUser2 = testUser2.save();

      Promise.all([saveTestUser, saveTestUser2]).then(() => {
        done();
      });

    });

    afterEach((done) => {
      User.remove({}).then(() => {
        done();
      });
    });

    it('should be able to login with email and password', function(done) {
      request(app)
      .post('/api/users/login')
      .send({
        identification: dummyUserEmail,
        password: dummyUserPassword
      })
      .expect(200)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should be able to login with username and password', function(done) {
      request(app)
      .post('/api/users/login')
      .send({
        identification: dummyUserUsername,
        password: dummyUserPassword
      })
      .expect(200)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to login with correct email and incorrect password', function(done) {
      request(app)
      .post('/api/users/login')
      .send({
        identification: dummyUserEmail,
        password: 'asdf1'
      })
      .expect(400)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to login with not existing username', function(done) {
      request(app)
      .post('/api/users/login')
      .send({
        identification: '122asdf',
        password: 'asdf1'
      })
      .expect(400)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to login with not existing email', function(done) {
      request(app)
      .post('/api/users/login')
      .send({
        identification: 'example1342@example.com',
        password: 'asdf1'
      })
      .expect(400)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to login with email that has not been verified', function(done) {
      request(app)
      .post('/api/users/login')
      .send({
        identification: dummyUser2Email,
        password: dummyUser2Password
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

  describe('Logout', function() {
    let sessionRequest;

    beforeEach((done) => {
      sessionRequest = testHelpers.createSessionRequestObject();
      testHelpers.loginDummyUser({sessionRequest}).then(() => {
        done();
      });
    });

    afterEach((done) => {
      testHelpers.removeDummyUser().then(() => {
        done();
      });
    });

    it('should be able to logout', function(done) {
      sessionRequest
      .post('/api/users/logout')
      .expect(200)
      .end(function(logoutErr) {
        if (logoutErr) {
          throw logoutErr;
        }

        sessionRequest
        .get('/api/users/current')
        .expect(401)
        .end(function(currentErr) {
          if (currentErr) {
            throw currentErr;
          }
          done();
        });
      });
    });

    it('should not be able to logout if not suthenticated', function(done) {
      request(app)
      .post('/api/users/logout')
      .expect(401)
      .end(function(logoutErr) {
        if (logoutErr) {
          throw logoutErr;
        }
        done();
      });
    });
  });

  describe('Current user', function() {
    let sessionRequest;
    let dummyUser;

    before((done) => {
      sessionRequest = testHelpers.createSessionRequestObject();
      testHelpers.loginDummyUser({sessionRequest}).then((user) => {
        dummyUser = user;
        done();
      });
    });

    after((done) => {
      testHelpers.logoutDummyUser({sessionRequest}).then(() => {
        done();
      });
    });

    it('should not be able to get current user when not authenticated', function(done) {
      request(app)
      .get('/api/users/current')
      .expect(401)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should be able to get current user when authenticated', function(done) {
      sessionRequest
      .get('/api/users/current')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('user');
        expect(res.body.user).to.have.property('username').to.be.a('string').to.equal(dummyUser.username);
      })
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });

  describe('Photo upload', function() {
    let sessionRequest;

    beforeEach((done) => {
      sessionRequest = testHelpers.createSessionRequestObject();
      testHelpers.loginDummyUser({sessionRequest}).then(() => {
        done();
      });
    });

    afterEach((done) => {
      testHelpers.logoutDummyUser({sessionRequest}).then(() => {
        done();
      });
    });

    it('should not be able to upload photo when not authenticated', function(done) {
      request(app)
      .post('/api/users/upload-photo')
      .attach('file', 'server/test/test-image.png')
      .expect(401)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should be able to upload photo when authenticated', function(done) {
      let photoId;
      sessionRequest
      .post('/api/users/upload-photo')
      .attach('file', 'server/test/test-image.png')
      .expect(201)
      .expect((res) => {
        expect(res.body).to.have.property('photo');
        expect(res.body.photo).to.have.property('id');
        photoId = res.body.photo.id;
      })
      .end(function(err) {
        if (err) {
          throw err;
        }

        testHelpers.getDummyUser().then((user) => {
          expect(user).to.have.property('photos').to.be.an('array').to.include(photoId).to.have.lengthOf(1);
          expect(user).to.have.property('profilePhoto');
          expect(user.profilePhoto.toString()).to.be.equal(photoId);

          done();
        });
      });
    });

    it('should not be able to upload photo when no files were given', function(done) {
      sessionRequest
      .post('/api/users/upload-photo')
      .expect(400)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });

  describe('Get user', function() {
    let sessionRequest;
    let userId;

    beforeEach((done) => {
      sessionRequest = testHelpers.createSessionRequestObject();
      testHelpers.loginDummyUser({sessionRequest}).then((user) => {
        userId = user.id;
        done();
      });
    });

    afterEach((done) => {
      testHelpers.logoutDummyUser({sessionRequest}).then(() => {
        done();
      });
    });

    it('should not be able to get user when not authenticated', function(done) {
      request(app)
      .get(`/api/users/${userId}`)
      .expect(401)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should be able to get user when authenticated', function(done) {
      sessionRequest
      .get(`/api/users/${userId}`)
      .expect(200)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to get user with bad id', function(done) {
      const dummyId = '3';

      sessionRequest
      .get(`/api/users/${dummyId}`)
      .expect(400)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to get user with not existing id', function(done) {
      const dummyId = '57b4b43dcaf81cf20772e800';
      sessionRequest
      .get(`/api/users/${dummyId}`)
      .expect(404)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });
});
