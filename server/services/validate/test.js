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

  describe('should validate username', function() {
    it('should return true when valid username is given', function() {
      const username = 'username';
      expect(validatePassword(username)).to.equal(true);
    });

    it('should return false when too short username is given', function() {
      const username = 'fo';
      expect(validatePassword(username)).to.equal(false);
    });

    it('should return false when too long username is given', function() {
      const username = '12345678901231234123987';
      expect(validatePassword(username)).to.equal(false);
    });

    it('should return false when empty string is given', function() {
      const username = '';
      expect(validatePassword(username)).to.equal(false);
    });
  });

  describe('should validate category name', function() {
    it('should return true when valid name is given', function() {
      const name = 'name';
      expect(validatePassword(name)).to.equal(true);
    });

    it('should return false when too short name is given', function() {
      const name = 'fo';
      expect(validatePassword(name)).to.equal(false);
    });

    it('should return false when too long name is given', function() {
      const name = '12345678901231234123987';
      expect(validatePassword(name)).to.equal(false);
    });

    it('should return false when empty string is given', function() {
      const name = '';
      expect(validatePassword(name)).to.equal(false);
    });
  });
});
