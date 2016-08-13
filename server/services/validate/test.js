import { describe, it } from 'mocha';
import { expect } from 'chai';

import { validateEmail, validatePassword } from './index';

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

  describe('should validate password', function() {
    it('should return true when valid password is given', function() {
      const password = 'password';
      expect(validatePassword(password)).to.equal(true);
    });

    it('should return false when too short password is given', function() {
      const password = 'fo';
      expect(validatePassword(password)).to.equal(false);
    });

    it('should return false when too long password is given', function() {
      const password = '12345678901231234123';
      expect(validatePassword(password)).to.equal(false);
    });

    it('should return false when empty string is given', function() {
      const password = '';
      expect(validatePassword(password)).to.equal(false);
    });
  });
});
