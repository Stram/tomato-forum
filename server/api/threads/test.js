import request from 'supertest';
import mongoose from 'mongoose';
import { describe, it, before, beforeEach, after, afterEach } from 'mocha';
import { expect } from 'chai';

import app from '../../index';
import Category from '../../models/category';
import testHelpers from '../../test/helpers';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

describe('API Threads', function() {

  let sessionRequest;
  let dummyCategory1Id;
  let dummyCategory2Id;

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

    Promise.all([dummyCategory1, dummyCategory2]).then(([category1, category2]) => {
      dummyCategory1Id = category1.id;
      dummyCategory2Id = category2.id;
      done();
    });
  });

  afterEach((done) => {
    Category.remove({}).then(() => {
      done();
    });
  });

  describe('Create thread', function() {

    after((done) => {
      testHelpers.removeThreads().then(() => {
        done();
      });
    });

    it('should be able to create a thread', function(done) {
      sessionRequest
      .post('/api/threads')
      .send({
        title: 'mock category',
        content: '*content*',
        categoryId: dummyCategory1Id
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
        categoryId: dummyCategory1Id
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

  describe('Get threads', function() {

    let dummyThread1;
    let dummyThread2;
    let dummyThread3;

    beforeEach((done) => {
      const thread1Promise = testHelpers.createDummyThread({
        categoryId: dummyCategory1Id
      });
      const thread2Promise = testHelpers.createDummyThread({
        categoryId: dummyCategory1Id
      });
      const thread3Promise = testHelpers.createDummyThread({
        categoryId: dummyCategory2Id
      });

      Promise.all([thread1Promise, thread2Promise, thread3Promise]).then(([thread1, thread2, thread3]) => {
        dummyThread1 = thread1;
        dummyThread2 = thread2;
        dummyThread3 = thread3;
        done();
      });
    });

    afterEach((done) => {
      testHelpers.removeThreads().then(() => {
        done();
      });
    });

    it('should be able to get threads', function(done) {
      sessionRequest
      .get('/api/threads')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.have.property('threads').be.an('array').to.have.length(3);
        expect(res.body).to.have.property('meta');
      })
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });

    it('should not be able to get threads when not authenticated', function(done) {
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
  });
});
