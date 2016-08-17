import { before } from 'mocha';
import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

before(function(done) {
  mockgoose(mongoose).then(function() {
    mongoose.connect('', function(err) {
      done(err);
    });
  });
});
