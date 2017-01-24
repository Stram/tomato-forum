import request from 'supertest';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';
import { expect } from 'chai';

import app from 'index';
import Category from 'models/category';
import testHelpers from 'test/helpers';

describe('API Threads - Get all', function() {

  let sessionRequest;
  let dummyUserId;

  let dummyCategory1Id;
  let dummyCategory2Id;

  before((done) => {
    sessionRequest = testHelpers.createSessionRequestObject();
    testHelpers.loginDummyUser({sessionRequest}).then((user) => {
      dummyUserId = user.id;
      done();
    });
  });

  after((done) => {
    testHelpers.logoutDummyUser({sessionRequest}).then(() => {
      done();
    });
  });

  beforeEach((done) => {
    const dummyCategory1 = testHelpers.createDummyCategory();
    const dummyCategory2 = testHelpers.createDummyCategory();

    Promise.all([dummyCategory1, dummyCategory2]).then(([category1, category2]) => {
      dummyCategory1Id = category1.id;
      dummyCategory2Id = category2.id;

      const thread1Promise = testHelpers.createDummyThread({
        categoryId: dummyCategory1Id
      });
      const thread2Promise = testHelpers.createDummyThread({
        categoryId: dummyCategory1Id
      });
      const thread3Promise = testHelpers.createDummyThread({
        categoryId: dummyCategory2Id
      });

      Promise.all([thread1Promise, thread2Promise, thread3Promise]).then(() => {

        done();
      });
    });
  });

  afterEach((done) => {
    Promise.all([Category.remove({}), testHelpers.removeThreads()]).then(() => {
      done();
    });
  });

  xit('should be able to get threads', function(done) {
    sessionRequest
    .get('/api/threads')
    .expect(200)
    .expect((res) => {
      expect(res.body).to.have.property('items').be.an('array').to.have.length(3);
      expect(res.body).to.have.property('meta');
    })
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  xit('should not be able to get threads when not authenticated', function(done) {
    request(app)
    .get('/api/threads')
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  xit('should be able to get threads only from a certain user', function(done) {
    sessionRequest
    .get('/api/threads')
    .query({owner: dummyUserId})
    .expect(200)
    .expect((res) => {
      expect(res.body).to.have.property('items').be.an('array').to.have.length(3);
      expect(res.body).to.have.property('meta');
    })
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  xit('should be able to get threads only in a certain category', function(done) {
    sessionRequest
    .get('/api/threads')
    .query({category: dummyCategory1Id})
    .expect(200)
    .expect((res) => {
      expect(res.body).to.have.property('items').be.an('array').to.have.length(2);
      expect(res.body).to.have.property('meta');
    })
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  xit('should be able to get threads on 2 pages with perPage param', function(done) {
    sessionRequest
    .get('/api/threads')
    .query({perPage: 2})
    .expect(200)
    .expect((res) => {
      expect(res.body).to.have.property('items').be.an('array').to.have.length(2);
      expect(res.body).to.have.property('meta');
      expect(res.body.meta).to.have.property('pages').to.be.equal(2);
    })
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });
});
