import session from 'supertest-session';
import randToken from 'rand-token';

import app from '../';
import User from '../models/user';
import Category from '../models/category';
import Thread from '../models/thread';

const dummyUserEmail = 'session@example.com';
const dummyUserPassword = 'password';
const dummyUserUsername = 'Session';

let currentUserId;

function createDummyUser() {

  const dummyUser = new User();

  dummyUser.local.email = dummyUserEmail;
  dummyUser.local.password = dummyUser.generateHash(dummyUserPassword);
  dummyUser.username = dummyUserUsername;

  return dummyUser.save().then((savedUser) => {
    return savedUser;
  });
}

function createSessionRequestObject() {
  return session(app);
}

function loginDummyUser(options = {}) {
  return createDummyUser().then((dummyUser) => {
    const sessionRequest = options.sessionRequest || createSessionRequestObject();

    return new Promise((resolve, reject) => {
      sessionRequest
      .post('/api/users/login')
      .send({
        identification: dummyUserEmail,
        password: dummyUserPassword
      })
      .end(function(err) {
        if (err) {
          reject(err);
        }
        currentUserId = dummyUser.id;
        resolve(dummyUser);
      });
    });
  });
}

function removeDummyUser() {
  return User.remove({username: dummyUserUsername});
}

function getDummyUser() {
  return User.findOne({username: dummyUserUsername});
}

function logoutDummyUser(options = {}) {
  const sessionRequest = options.sessionRequest;

  return new Promise((resolve, reject) => {
    sessionRequest
    .post('/api/users/logout')
    .end(function(err) {
      if (err) {
        reject(err);
      }
      removeDummyUser().then(() => {
        resolve();
      });
    });
  });
}

function removeCategories() {
  return Category.remove({});
}

function createDummyCategory() {
  const categoryName = randToken.generate(8);

  const dummyCategory = new Category({
    name: categoryName
  });

  return dummyCategory.save();
}

function createDummyThread(options = {}) {
  const threadTitle = randToken.generate(8);

  const newThread = new Thread({
    category: options.categoryId,
    title: threadTitle,
    content: '*content*',
    owner: currentUserId
  });

  return newThread.save();
}

function removeThreads() {
  return Thread.remove({});
}

module.exports = {
  createDummyUser,
  removeDummyUser,
  getDummyUser,
  createSessionRequestObject,
  loginDummyUser,
  logoutDummyUser,

  createDummyCategory,
  removeCategories,

  createDummyThread,
  removeThreads
};
