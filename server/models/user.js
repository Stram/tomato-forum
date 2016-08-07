import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';
import randToken from 'rand-token';
import {validateEmail, validatePassword} from '../services/validate';

import applicationConfig from '../config/application';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  username: String,

  local: {
    email: {
      type: String,
      validate: {
        validator: validateEmail,
        message: 'Email is not valid'
      },
      required: [true, 'User email required']
    },
    password: {
      type: String,
      validate: {
        validator: validatePassword,
        message: 'Password should be between 3 and 8 characters'
      },
      required: [true, 'User password required']
    }
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
  createdAt: {
    type: Date,
    default: new Date()
  },

  lastActivity: {
    type: Date,
    default: new Date()
  },

  location: {
    type: String,
    default: 'Croatia'
  },

  background: {
    type: Number,
    default: '0'
  },

  membership: {
    type: Number
    // default:
  },

  profilePhoto: {
    type: ObjectId,
    ref: 'Photo'
  },

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
  const self = this;
  const hostName = applicationConfig.getFullHostname();

  const userId = this.id;
  const token = randToken.generate(32);

  this.token = token;
  return new Promise((resolve, reject) => {
    self.save().then((user) => {
      resolve(`${hostName}/verify?userId=${userId}&token=${user.token}`);
    }).catch((error) => {
      reject(error);
    });
  });
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
