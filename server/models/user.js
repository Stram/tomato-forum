import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import randToken from 'rand-token';

import applicationConfig from '../config/application';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,
  local: {
    email: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  },

  token: String,
  photos: [{
    type: ObjectId,
    ref: 'Photo'
  }],
  threads: [{
    type: ObjectId,
    ref: 'Thread'
  }]

});

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

userSchema.methods.getVerificationLink = function() {
  const hostName = applicationConfig.getFullHostname();

  const userId = this.id;
  const token = randToken.generate(32);

  this.token = token;
  this.save();

  return `http://${hostName}/verify?userId=${userId}&token=${token}`;
};

userSchema.options.toObject = userSchema.options.toObject ? userSchema.options.toObject : {};
userSchema.options.toObject.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  delete ret.local;
  return ret;
};

module.exports = mongoose.model('User', userSchema);
