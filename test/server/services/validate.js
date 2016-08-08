import { describe, it } from 'mocha';
import { expect } from 'chai';

import {validateEmail} from '../../../server/services/validate';

describe('Validators', function() {
  describe('should validate email', function() {
    it('should return true when valid email is given', function() {
      const email = 'exapmle@example.com';
      expect(validateEmail(email)).to.equal(true);
    });

    it('should return false when invalid email is given', function() {
      const email = 'exapmle@example';
      expect(validateEmail(email)).to.equal(false);
    });

    it('should return false when invalid email is given', function() {
      const email = 'exapmle.example.com';
      expect(validateEmail(email)).to.equal(false);
    });

    it('should return false when empty string is given', function() {
      const email = '';
      expect(validateEmail(email)).to.equal(false);
    });
  });
});
