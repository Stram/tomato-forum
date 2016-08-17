import session from 'supertest-session';

import app from '../';
import User from '../models/user';
import Category from '../models/category';

const dummyUserEmail = 'session@example.com';
const dummyUserPassword = 'password';
const dummyUserUsername = 'Session';

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

function loginDummyUser(options) {
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

function logoutDummyUser(options) {
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


function createDummyCategory() {
  const categoryName = 'category';

  const dummyCategory = new Category();

  dummyCategory.name = categoryName;
  return dummyCategory.save();
}

module.exports = {
  createDummyUser,
  removeDummyUser,
  getDummyUser,
  createSessionRequestObject,
  loginDummyUser,
  logoutDummyUser,

  createDummyCategory
};
