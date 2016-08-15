import { describe, it } from 'mocha';
import { expect } from 'chai';

import errors from './index';

describe('Errors', function() {
  describe('should create 404 error', function() {
    it('should return NotFound error when only message is given', function() {
      const error = new errors.NotFound('Not found');
      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal('Not found');
      expect(error.field).to.equal(undefined);
    });

    it('should return NotFound error when object is given', function() {
      const error = new errors.NotFound({
        message: 'Not found',
        field: 'field'
      });

      expect(error.statusCode).to.equal(404);
      expect(error.message).to.equal('Not found');
      expect(error.field).to.equal('field');
    });
  });

  describe('should create 400 error', function() {
    it('should return BadRequest error when only message is given', function() {
      const error = new errors.BadRequest('Bad request');
      expect(error.statusCode).to.equal(400);
      expect(error.message).to.equal('Bad request');
      expect(error.field).to.equal(undefined);
    });

    it('should return BadRequest error when object is given', function() {
      const error = new errors.BadRequest({
        message: 'Bad request',
        field: 'field'
      });

      expect(error.statusCode).to.equal(400);
      expect(error.message).to.equal('Bad request');
      expect(error.field).to.equal('field');
    });
  });
});
