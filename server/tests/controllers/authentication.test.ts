import request from 'supertest';
import 'mocha';

import app from 'index';
import User from 'models/user';

// describe('API Users - Login', function() {
//   const dummyUserEmail = 'example@example.com';
//   const dummyUserPassword = '12345';
//   const dummyUserUsername = 'Username';
//
//   const dummyUser2Email = 'example1234@example.com';
//   const dummyUser2Password = 'password';
//   const dummyUser2Username = 'Username234';
//   const dummyUser2Token = '12345678901234567890';
//
//   beforeEach((done) => {
//     const testUser = new User();
//
//     testUser.local.email = dummyUserEmail;
//     testUser.local.password = testUser.generateHash(dummyUserPassword);
//     testUser.username = dummyUserUsername;
//
//     const saveTestUser = testUser.save();
//
//     const testUser2 = new User();
//
//     testUser2.local.email = dummyUser2Email;
//     testUser2.local.password = testUser2.generateHash(dummyUser2Password);
//     testUser2.username = dummyUser2Username;
//     testUser2.token = dummyUser2Token;
//
//     const saveTestUser2 = testUser2.save();
//
//     Promise.all([saveTestUser, saveTestUser2]).then(() => {
//       done();
//     });
//
//   });
//
//   afterEach((done) => {
//     User.remove({}).then(() => {
//       done();
//     });
//   });
//
//   it('should be able to login with email and password', function(done) {
//     request(app)
//     .post('/api/users/login')
//     .send({
//       identification: dummyUserEmail,
//       password: dummyUserPassword
//     })
//     .expect(200)
//     .end(function(err) {
//       if (err) {
//         throw err;
//       }
//       done();
//     });
//   });
//
//   it('should be able to login with username and password', function(done) {
//     request(app)
//     .post('/api/users/login')
//     .send({
//       identification: dummyUserUsername,
//       password: dummyUserPassword
//     })
//     .expect(200)
//     .end(function(err) {
//       if (err) {
//         throw err;
//       }
//       done();
//     });
//   });
//
//   it('should not be able to login with correct email and incorrect password', function(done) {
//     request(app)
//     .post('/api/users/login')
//     .send({
//       identification: dummyUserEmail,
//       password: 'asdf1'
//     })
//     .expect(400)
//     .end(function(err) {
//       if (err) {
//         throw err;
//       }
//       done();
//     });
//   });
//
//   it('should not be able to login with not existing username', function(done) {
//     request(app)
//     .post('/api/users/login')
//     .send({
//       identification: '122asdf',
//       password: 'asdf1'
//     })
//     .expect(400)
//     .end(function(err) {
//       if (err) {
//         throw err;
//       }
//       done();
//     });
//   });
//
//   it('should not be able to login with not existing email', function(done) {
//     request(app)
//     .post('/api/users/login')
//     .send({
//       identification: 'example1342@example.com',
//       password: 'asdf1'
//     })
//     .expect(400)
//     .end(function(err) {
//       if (err) {
//         throw err;
//       }
//       done();
//     });
//   });
//
//   it('should not be able to login with email that has not been verified', function(done) {
//     request(app)
//     .post('/api/users/login')
//     .send({
//       identification: dummyUser2Email,
//       password: dummyUser2Password
//     })
//     .expect(400)
//     .end(function(err) {
//       if (err) {
//         throw err;
//       }
//       done();
//     });
//   });
// });
