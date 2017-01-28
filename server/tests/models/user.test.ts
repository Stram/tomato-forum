// import * as mocha from 'mocha';
import 'mocha';
import {expect} from 'chai';

import User from 'models/user';

// const {describe, it, afterEach} = mocha;



describe('User model', () => {

  describe('Model properties', () => {

    // afterEach((done) => {
    //   User.remove({}).then(() => {
    //     done();
    //   });
    // });
    //
    // it('should have apropriate properties when serialized', (done) => {
    //   const dummyUser = new User({
    //     username: 'Dummy',
    //     local: {
    //       email: 'example@example.com',
    //       password: 'asdfasdfasdf'
    //     }
    //   });
    //
    //   dummyUser.save().then((savedDummyUser) => {
    //     const objectOfSavedDummyUser = savedDummyUser.toObject();
    //
    //     expect(objectOfSavedDummyUser).to.not.have.property('_id');
    //     expect(objectOfSavedDummyUser).to.have.property('id');
    //     expect(objectOfSavedDummyUser).to.not.have.property('__v');
    //     expect(objectOfSavedDummyUser).to.not.have.property('local');
    //     expect(objectOfSavedDummyUser).to.have.property('username').to.be.a('string');
    //     expect(objectOfSavedDummyUser).to.have.property('email').to.be.a('string');
    //     expect(objectOfSavedDummyUser).to.have.property('createdAt').to.be.a('date');
    //     expect(objectOfSavedDummyUser).to.have.property('updatedAt').to.be.a('date');
    //     // expect(objectOfSavedDummyUser).to.have.property('lastActivity').to.be.a('date');
    //     expect(objectOfSavedDummyUser).to.have.property('theme').to.be.a('number');
    //
    //     done();
    //   });
    // });
  });
});
