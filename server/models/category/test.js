import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';

import Category from './index';

describe('Category model', () => {
  describe('Model properties', () => {

    afterEach((done) => {
      Category.remove({}).then(() => {
        done();
      });
    });

    it('should have apropriate properties when changed to object', (done) => {
      const dummyCategory = new Category({
        name: 'Category name'
      });

      dummyCategory.save().then((savedDummyCategory) => {
        const objectOfSavedDummyCategory = savedDummyCategory.toObject();

        expect(objectOfSavedDummyCategory).to.not.have.property('_id');
        expect(objectOfSavedDummyCategory).to.have.property('id');
        expect(objectOfSavedDummyCategory).to.not.have.property('__v');
        expect(objectOfSavedDummyCategory).to.have.property('name').to.be.a('string');
        expect(objectOfSavedDummyCategory).to.have.property('createdAt').to.be.a('date');
        expect(objectOfSavedDummyCategory).to.have.property('allowNewThreads').to.be.a('boolean');
        expect(objectOfSavedDummyCategory).to.have.property('threads').to.be.a('array');

        done();
      });
    });
  });
});
