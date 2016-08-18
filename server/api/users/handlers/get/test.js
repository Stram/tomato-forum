import request from 'supertest';
import { describe, it, beforeEach, afterEach } from 'mocha';

import app from '~/index';
import testHelpers from '~/test/helpers';

describe('API Users - Get', function() {
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
