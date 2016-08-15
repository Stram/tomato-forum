import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';
import _ from 'lodash';

import objectTransformation from './object-transformation';
import User from './index';

describe('User model', () => {
  describe('Object transformation helper', () => {
    it('should transform given object', () => {
      const object = {
        _id: 2345,
        __v: 234234,
        property: 'treba ostati',
        local: {
          something: 'something'
        }
      };

      const object2 = _.cloneDeep(object);

      objectTransformation(object, object2);

      expect(object).to.have.property('_id');
      expect(object).to.not.have.property('id');
      expect(object).to.have.property('__v');
      expect(object).to.have.property('property');
      expect(object).to.have.property('property');

      expect(object2).to.not.have.property('_id');
      expect(object2).to.have.property('id');
      expect(object2).to.not.have.property('__v');
      expect(object2).to.have.property('property');
      expect(object2).to.not.have.property('local');
    });
  });

  describe('Model properties', () => {

    afterEach((done) => {
      User.remove({}).then(() => {
        done();
      });
    });

    it('should have apropriate properties when changed to object', (done) => {
      const dummyUser = new User({
        username: 'Dummy',
        local: {
          email: 'example@example.com',
          password: 'asdfasdfasdf'
        }
      });

      dummyUser.save().then((savedDummyUser) => {
        const objectOfSavedDummyUser = savedDummyUser.toObject();

        expect(objectOfSavedDummyUser).to.not.have.property('_id');
        expect(objectOfSavedDummyUser).to.have.property('id');
        expect(objectOfSavedDummyUser).to.not.have.property('__v');
        expect(objectOfSavedDummyUser).to.not.have.property('local');
        expect(objectOfSavedDummyUser).to.have.property('username').to.be.a('string');
        expect(objectOfSavedDummyUser).to.have.property('createdAt').to.be.a('date');
        expect(objectOfSavedDummyUser).to.have.property('lastActivity').to.be.a('date');
        expect(objectOfSavedDummyUser).to.have.property('location').to.be.a('string');
        expect(objectOfSavedDummyUser).to.have.property('background').to.be.a('number');

        done();
      });
    });

    it('should have default and given values values when created', (done) => {
      const dummyUser = new User({
        username: 'Dummy',
        local: {
          email: 'example@example.com',
          password: 'asdfasdfasdf'
        }
      });

      dummyUser.save().then((savedDummyUser) => {
        expect(savedDummyUser.username).to.equal('Dummy');
        expect(savedDummyUser.location).to.equal('Croatia');
        expect(savedDummyUser.background).to.equal(0);

        done();
      });
    });
  });
});
