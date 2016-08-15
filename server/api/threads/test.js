import request from 'supertest';
import session from 'supertest-session';
import mongoose from 'mongoose';
import { describe, it, before, beforeEach, afterEach } from 'mocha';

import app from '../../server';
import User from '../../models/user';
import Category from '../../models/category';

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;


describe('API Threads', function() {

  let sessionRequest;
  let dummyCategoryId;

  before((done) => {
    const dummyUserEmail = 'session@example.com';
    const dummyUserPassword = 'password';
    const dummyUserUsername = 'Session';

    const dummyUser = new User();

    dummyUser.local.email = dummyUserEmail;
    dummyUser.local.password = dummyUser.generateHash(dummyUserPassword);
    dummyUser.username = dummyUserUsername;

    dummyUser.save().then(() => {
      sessionRequest = session(app);

      sessionRequest
      .post('/api/users/login')
      .send({
        identification: dummyUserEmail,
        password: dummyUserPassword
      })
      .expect(200)
      .end(function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });

  beforeEach((done) => {
    const categoryName = 'category';

    const dummyCategory = new Category();

    dummyCategory.name = categoryName;
    dummyCategory.save().then((createdCategory) => {
      dummyCategoryId = createdCategory.id;
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

    it('should not be able to create a category with illigal category id', function(done) {
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
