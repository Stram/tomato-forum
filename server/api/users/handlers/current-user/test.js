import request from 'supertest';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';

import app from '~/index';
import testHelpers from '~/test/helpers';

describe('API Users - Current user', function() {
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
