import request from 'supertest';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';

import app from '~/index';
import Category from '~/models/category';
import testHelpers from '~/test/helpers';

describe('API Threads - Get', function() {

  let sessionRequest;

  let dummyCategory;

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
      dummyCategory = category;
      done();
    });
  });

  afterEach((done) => {
    Category.remove({}).then(() => {
      done();
    });
  });

  it('should be able to get category', function(done) {
    const categoryId = dummyCategory.id;

    sessionRequest
    .get(`/api/categories/${categoryId}`)
    .expect(200)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to get categories when not authenticated', function(done) {
    const categoryId = dummyCategory.id;

    request(app)
    .get(`/api/categories/${categoryId}`)
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to get category wxith bad id', function(done) {
    const categoryId = '3';

    sessionRequest
    .get(`/api/categories/${categoryId}`)
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to get thread with not existing id', function(done) {
    const categoryId = '57b4b43dcaf81cf20772e800';

    sessionRequest
    .get(`/api/categories/${categoryId}`)
    .expect(404)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });
});
