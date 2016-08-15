import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';

import Photo from './index';

describe('Photo model', () => {
  describe('Model properties', () => {

    afterEach((done) => {
      Photo.remove({}).then(() => {
        done();
      });
    });

    it('should have apropriate properties when changed to object', (done) => {
      const dummyPhoto = new Photo({
        name: 'Photo name',
        url: 'photo.url'
      });

      dummyPhoto.save().then((savedDummyPhoto) => {
        const objectOfSavedDummyPhoto = savedDummyPhoto.toObject();

        expect(objectOfSavedDummyPhoto).to.not.have.property('_id');
        expect(objectOfSavedDummyPhoto).to.have.property('id');
        expect(objectOfSavedDummyPhoto).to.not.have.property('__v');
        expect(objectOfSavedDummyPhoto).to.have.property('name').to.be.a('string');
        expect(objectOfSavedDummyPhoto).to.have.property('createdAt').to.be.a('date');

        done();
      });
    });

    it('should have default and given values when created', (done) => {
      const dummyPhoto = new Photo({
        name: 'Photo name',
        url: 'photo.url'
      });

      dummyPhoto.save().then((savedDummyPhoto) => {
        expect(savedDummyPhoto.name).to.equal('Photo name');
        expect(savedDummyPhoto.url).to.equal('photo.url');

        done();
      });
    });
  });
});
