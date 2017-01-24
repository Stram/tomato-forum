import request from 'supertest';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';

import app from 'index';
import testHelpers from 'test/helpers';

describe('API Users - Photo upload', function() {
  let sessionRequest;

  beforeEach((done) => {
    sessionRequest = testHelpers.createSessionRequestObject();
    testHelpers.loginDummyUser({sessionRequest}).then(() => {
      done();
    });
  });

  afterEach((done) => {
    testHelpers.logoutDummyUser({sessionRequest}).then(() => {
      done();
    });
  });

  it('should not be able to upload photo when not authenticated', function(done) {
    request(app)
    .post('/api/users/upload-photo')
    .attach('file', 'server/test/test-image.png')
    .expect(401)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });

  it('should be able to upload photo when authenticated', function(done) {
    let photoId;
    sessionRequest
    .post('/api/users/upload-photo')
    .attach('file', 'server/test/test-image.png')
    .expect(201)
    .expect((res) => {
      expect(res.body).to.have.property('photo');
      expect(res.body.photo).to.have.property('id');
      photoId = res.body.photo.id;
    })
    .end(function(err) {
      if (err) {
        throw err;
      }

      testHelpers.getDummyUser().then((user) => {
        expect(user).to.have.property('photos').to.be.an('array').to.include(photoId).to.have.lengthOf(1);
        expect(user).to.have.property('profilePhoto');
        expect(user.profilePhoto.toString()).to.be.equal(photoId);

        done();
      });
    });
  });

  it('should not be able to upload photo when no files were given', function(done) {
    sessionRequest
    .post('/api/users/upload-photo')
    .expect(400)
    .end(function(err) {
      if (err) {
        throw err;
      }
      done();
    });
  });
});
