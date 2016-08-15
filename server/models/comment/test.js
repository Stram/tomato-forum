import { describe, it, afterEach } from 'mocha';
import { expect } from 'chai';

import Comment from './index';

describe('Comment model', () => {
  describe('Model properties', () => {

    afterEach((done) => {
      Comment.remove({}).then(() => {
        done();
      });
    });

    it('should have apropriate properties when changed to object', (done) => {
      const dummyComment = new Comment({
        content: 'Comment content'
      });

      dummyComment.save().then((savedDummyComment) => {
        const objectOfSavedDummyComment = savedDummyComment.toObject();

        expect(objectOfSavedDummyComment).to.not.have.property('_id');
        expect(objectOfSavedDummyComment).to.have.property('id');
        expect(objectOfSavedDummyComment).to.not.have.property('__v');
        expect(objectOfSavedDummyComment).to.have.property('content').to.be.a('string');
        expect(objectOfSavedDummyComment).to.have.property('createdAt').to.be.a('date');

        done();
      });
    });

    it('should have default and given values when created', (done) => {
      const dummyComment = new Comment({
        content: 'Comment content'
      });

      dummyComment.save().then((savedDummyComment) => {
        expect(savedDummyComment.content).to.equal('Comment content');

        done();
      });
    });
  });
});
