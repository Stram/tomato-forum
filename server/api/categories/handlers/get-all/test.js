import request from 'supertest';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';
import { expect } from 'chai';

import app from '~/index';
import Category from '~/models/category';
import testHelpers from '~/test/helpers';

describe('API Categories - Get all', function() {

  let sessionRequest;

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
    const dummyCategory1 = testHelpers.createDummyCategory();
    const dummyCategory2 = testHelpers.createDummyCategory();
    const dummyCategory3 = testHelpers.createDummyCategory();

    Promise.all([dummyCategory1, dummyCategory2, dummyCategory3]).then(() => {
      done();
    });
  });

  afterEach((done) => {
    Category.remove({}).then(() => {
      done();
    });
  });

  it('should be able to get categories', function(done) {
    sessionRequest
    .get('/api/categories')
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

  it('should not be able to get categories when not authenticated', function(done) {
    request(app)
    .get('/api/categories')
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should be able to get categories on 2 pages with perPage param', function(done) {
    sessionRequest
    .get('/api/categories')
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
