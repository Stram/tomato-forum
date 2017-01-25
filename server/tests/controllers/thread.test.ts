import request from 'supertest';
import mongoose from 'mongoose';
import {describe, it, before, beforeEach, after, afterEach} from 'mocha';

import app from 'index';
import Category from 'models/category';
import testHelpers from 'test/helpers';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

describe('Controller Threads', () => {
  let sessionRequest;
  let dummyCategoryId;

  before((done: Function) => {
    sessionRequest = testHelpers.createSessionRequestObject();
    testHelpers.loginDummyUser({sessionRequest}).then(() => {
      done();
    });
  });

  after((done: Function) => {
    Promise.all([testHelpers.logoutDummyUser({sessionRequest}), testHelpers.removeThreads()]).then(() => {
      done();
    });
  });

  beforeEach((done: Function) => {
    testHelpers.createDummyCategory().then((category) => {
      dummyCategoryId = category.id;
      done();
    });
  });

  afterEach((done: Function) => {
    Category.remove({}).then(() => {
      done();
    });
  });

  it('should be able to create a thread', function(done: Function) {
    sessionRequest
    .post('/api/threads')
    .send({
      title: 'mock category',
      content: '*content*',
      categoryId: dummyCategoryId
    })
    .expect(201)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to create a thread when not authenticated', function(done: Function) {
    request(app)
    .post('/api/threads')
    .send({
      title: 'mock category',
      content: '*content*',
      categoryId: dummyCategoryId
    })
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to create a thread with illigal category id', function(done: Function) {
    sessionRequest
    .post('/api/threads')
    .send({
      title: 'mock category',
      content: '*content*',
      categoryId: objectId('12341234')
    })
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to create a thread without title', function(done: Function) {
    sessionRequest
    .post('/api/threads')
    .send({
      content: '*content*',
      categoryId: dummyCategoryId
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
