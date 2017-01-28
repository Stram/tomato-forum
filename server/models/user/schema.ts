import * as mongoose from 'mongoose';
import {validateEmail, validateUsername} from 'services/validator';

// import applicationConfig from '../../config/application';

const {ObjectId} = mongoose.Schema.Types;

export default new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: validateUsername,
      message: 'Username is not valid'
    }
  },

  local: {
    email: {
      type: String,
      validate: {
        validator: validateEmail,
        message: 'Email is not valid'
      },
      required: [true, 'User email required'],
      unique: [true, 'Email is already in use']
    },
    password: {
      type: String,
      required: [true, 'User password required']
    }
  },

  // facebook: {
  //   id: String,
  //   token: String,
  //   email: String,
  //   name: String
  // },
  //
  // google: {
  //   id: String,
  //   token: String,
  //   email: String,
  //   name: String
  // },

  token: String,
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  },

  lastActivity: {
    type: Date,
    default: Date.now
  },

  // RELATIONS

  // profilePhoto: {
  //   type: ObjectId,
  //   ref: 'Photo'
  // },
  //
  // photos: [{
  //   type: ObjectId,
  //   ref: 'Photo'
  // }],
  //
  // threads: [{
  //   type: ObjectId,
  //   ref: 'Thread'
  // }]
});

// userSchema.methods.getVerificationLink = function() {
//   const self = this;
//   const hostName = applicationConfig.getFullHostname();
//
//   const userId = this.id;
//   const token = randToken.generate(32);
//
//   this.token = token;
//   return new Promise((resolve, reject) => {
//     self.save().then((user) => {
//       resolve(`${hostName}/verify?userId=${userId}&token=${user.token}`);
//     }).catch((error) => {
//       reject(error);
//     });
//   });
// };

// userSchema.plugin(mongooseDeepPopulate(mongoose));
