import {describe, it, afterEach} from 'mocha';
import {expect} from 'chai';

import Thread from './index';

describe('Thread model', () => {
  describe('Model properties', () => {

    afterEach((done) => {
      Thread.remove({}).then(() => {
        done();
      });
    });

    it('should have apropriate properties when changed to object', (done) => {
      const dummyThread = new Thread({
        title: 'Thread title',
        content: '*content*'
      });

      dummyThread.save().then((savedDummyThread) => {
        const objectOfSavedDummyThread = savedDummyThread.toObject();

        expect(objectOfSavedDummyThread).to.not.have.property('_id');
        expect(objectOfSavedDummyThread).to.have.property('id');
        expect(objectOfSavedDummyThread).to.not.have.property('__v');
        expect(objectOfSavedDummyThread).to.have.property('title').to.be.a('string');
        expect(objectOfSavedDummyThread).to.have.property('createdAt').to.be.a('date');
        expect(objectOfSavedDummyThread).to.have.property('content').to.be.a('string');

        done();
      });
    });
  });
});
