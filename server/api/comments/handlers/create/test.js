import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';

import app from 'index';
import Comment from 'models/comment';
import testHelpers from 'test/helpers';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

describe('API Comments - Create', function() {

  let sessionRequest;
  let dummyThreadId;

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
      const dummyCategoryId = category.id;

      testHelpers.createDummyThread({
        categoryId: dummyCategoryId
      }).then((thread) => {
        dummyThreadId = thread.id;
        done();
      });
    });
  });

  afterEach((done) => {
    Promise.all([testHelpers.removeThreads(), testHelpers.removeCategories(), Comment.remove({})]).then(() => {
      done();
    });
  });

  it('should be able to create a comment', function(done) {
    sessionRequest
    .post('/api/comments')
    .send({
      content: '*content*',
      threadId: dummyThreadId
    })
    .expect(201)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to create a comment when not authenticated', function(done) {
    request(app)
    .post('/api/comments')
    .send({
      content: '*content*',
      threadId: dummyThreadId
    })
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should not be able to create a comment with illigal thread id', function(done) {
    sessionRequest
    .post('/api/comments')
    .send({
      content: '*content*',
      threadId: objectId('12341234')
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
