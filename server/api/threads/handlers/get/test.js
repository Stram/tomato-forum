import request from 'supertest';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';

import app from 'index';
import Category from 'models/category';
import testHelpers from 'test/helpers';

describe('API Threads - Get', function() {

  let sessionRequest;

  let dummyThread;

  before((done) => {
    sessionRequest = testHelpers.createSessionRequestObject();
    testHelpers.loginDummyUser({sessionRequest}).then(() => {
      done();
    });
  });

  after((done) => {
    testHelpers.logoutDummyUser({sessionRequest}).then(() => {
      done();
    });
  });

  beforeEach((done) => {
    testHelpers.createDummyCategory().then((category) => {

      testHelpers.createDummyThread({
        categoryId: category.id
      }).then((thread) => {
        dummyThread = thread;
        done();
      });
    });
  });

  afterEach((done) => {
    Promise.all([Category.remove({}), testHelpers.removeThreads()]).then(() => {
      done();
    });
  });

  it('should be able to get thread', function(done) {
    const threadId = dummyThread.id;

    sessionRequest
    .get(`/api/threads/${threadId}`)
    .expect(200)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to get threads when not authenticated', function(done) {
    const threadId = dummyThread.id;

    request(app)
    .get(`/api/threads/${threadId}`)
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to get thread with bad id', function(done) {
    const threadId = '3';

    sessionRequest
    .get(`/api/threads/${threadId}`)
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to get thread with not existing id', function(done) {
    const threadId = '57b4b43dcaf81cf20772e800';

    sessionRequest
    .get(`/api/threads/${threadId}`)
    .expect(404)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });
});
