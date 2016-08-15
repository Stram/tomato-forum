import request from 'supertest';
import session from 'supertest-session';
import app from '../../server';
import { describe, it, before } from 'mocha';

import User from '../../models/user';

describe('API Categories', function() {

  let sessionRequest;

  before((done) => {
    const dummyUserEmail = 'session@example.com';
    const dummyUserPassword = 'password';
    const dummyUserUsername = 'Session';

    const dummyUser = new User();

    dummyUser.local.email = dummyUserEmail;
    dummyUser.local.password = dummyUser.generateHash(dummyUserPassword);
    dummyUser.username = dummyUserUsername;

    dummyUser.save().then(() => {
      sessionRequest = session(app);

      sessionRequest
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
  });

  describe('Create category', function() {
    it('should be able to create a category', function(done) {
      sessionRequest
      .post('/api/categories/')
      .send({
        name: 'mock category'
      })
      .expect(201)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to create a category when not authenticated', function(done) {
      request(app)
      .post('/api/categories/')
      .send({
        name: 'mock category'
      })
      .expect(401)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to create a category with illigal name', function(done) {
      sessionRequest
      .post('/api/categories/')
      .send({
        name: 'm'
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
});
