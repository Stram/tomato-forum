// import randToken from 'rand-token';

import {isValidEmail, isValidUsername} from 'services/validator';
import {Types, Defaults} from 'services/orm/model';

// import applicationConfig from '../../config/application';

export default {
  username: {
    type: Types.string(20),
    validate: {
      validator: isValidUsername,
      message: 'Username is not valid'
    }
  },

  email: {
    type: Types.string(255),
    validate: {
      validator: isValidEmail,
      message: 'Email is not valid'
    },
    required: 'User email required',
    unique: 'Email is already in use'
  },

  password: {
    type: Types.string(255),
    required: 'User password required'
  },

  token: {
    type: Types.string(20)
  },

  createdAt: {
    type: Types.timestamp(),
    default: Defaults.TODAY
  },

  updatedAt: {
    type: Types.timestamp(),
    default: Defaults.TODAY
  },

  lastActivity: {
    type: Types.timestamp(),
    default: Defaults.TODAY
  }

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
};

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
