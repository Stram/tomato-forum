import request from 'supertest';
import { describe, it, before, after, afterEach } from 'mocha';

import app from '~/index';
import testHelpers from '~/test/helpers';
import Category from '~/models/category';

describe('API Categories - Create', function() {
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

  afterEach((done) => {
    Category.remove({}).then(() => {
      done();
    });
  });

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
