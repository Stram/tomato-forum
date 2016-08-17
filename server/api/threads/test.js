import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';

import app from '../../index';
import Category from '../../models/category';
import testHelpers from '../../test/helpers';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

describe('API Threads', function() {

  let sessionRequest;
  let dummyCategoryId;

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
      dummyCategoryId = category.id;
      done();
    });
  });

  afterEach((done) => {
    Category.remove({}).then(() => {
      done();
    });
  });

  describe('Create thread', function() {
    it('should be able to create a thread', function(done) {
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

    it('should not be able to create a thread when not authenticated', function(done) {
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

    it('should not be able to create a thread with illigal category id', function(done) {
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
  });
});
