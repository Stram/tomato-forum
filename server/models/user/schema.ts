// import randToken from 'rand-token';

import {isValidEmail, isValidUsername} from 'services/validator';

// import applicationConfig from '../../config/application';

export default {
  username: {
    type: 'varchar(20)',
    validate: {
      validator: isValidUsername,
      message: 'Username is not valid'
    }
  },

  email: {
    type: 'varchar(255)',
    validate: {
      validator: isValidEmail,
      message: 'Email is not valid'
    },
    required: 'User email required',
    unique: 'Email is already in use'
  },

  password: {
    type: 'varchar(255)',
    required: 'User password required'
  },

  token: {
    type: 'varchar(20)'
  },

  createdAt: {
    type: 'timestamp',
    default: 'TODAY'
  },

  updatedAt: {
    type: 'timestamp',
    default: 'TODAY'
  },

  lastActivity: {
    type: 'timestamp',
    default: 'TODAY'
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
