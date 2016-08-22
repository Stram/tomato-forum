import request from 'supertest';
import { describe, it, beforeEach, afterEach } from 'mocha';

import app from '~/index';
import testHelpers from '~/test/helpers';

describe('API Users - Logout', function() {
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
      done();
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
