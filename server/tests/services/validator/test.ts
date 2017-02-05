import 'mocha';
import {expect} from 'chai';

import * as validator from 'services/validator';

describe('validators', function() {
  describe('should validate email', function() {
    it('should return true when valid email is given', function() {
      const email = 'exapmle@example.com';
      expect(validator.isValidEmail(email)).to.equal(true);
    });

    it('should return false when invalid email is given', function() {
      const email = 'exapmle@example';
      expect(validator.isValidEmail(email)).to.equal(false);
    });

    it('should return false when invalid email is given', function() {
      const email = 'exapmle.example.com';
      expect(validator.isValidEmail(email)).to.equal(false);
    });

    it('should return false when empty string is given', function() {
      const email = '';
      expect(validator.isValidEmail(email)).to.equal(false);
    });
  });

  describe('should validate password', function() {
    it('should return true when valid password is given', function() {
      const password = 'password';
      expect(validator.isValidPassword(password)).to.equal(true);
    });

    it('should return false when too short password is given', function() {
      const password = 'fo';
      expect(validator.isValidPassword(password)).to.equal(false);
    });

    it('should return false when too long password is given', function() {
      const password = '12345678901231234123';
      expect(validator.isValidPassword(password)).to.equal(false);
    });

    it('should return false when empty string is given', function() {
      const password = '';
      expect(validator.isValidPassword(password)).to.equal(false);
    });
  });

  // describe('should validate username', function() {
  //   it('should return true when valid username is given', function() {
  //     const username = 'username';
  //     expect(validatePassword(username)).to.equal(true);
  //   });
  //
  //   it('should return false when too short username is given', function() {
  //     const username = 'fo';
  //     expect(validatePassword(username)).to.equal(false);
  //   });
  //
  //   it('should return false when too long username is given', function() {
  //     const username = '12345678901231234123987';
  //     expect(validatePassword(username)).to.equal(false);
  //   });
  //
  //   it('should return false when empty string is given', function() {
  //     const username = '';
  //     expect(validatePassword(username)).to.equal(false);
  //   });
  // });
});
