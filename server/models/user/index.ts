import * as mongoose from 'mongoose';
// import mongooseDeepPopulate from 'mongoose-deep-populate';
import {hashSync, compareSync, genSaltSync} from 'bcrypt-nodejs';
// import randToken from 'rand-token';

import {validateEmail, validateUsername} from 'services/validator';

// import applicationConfig from '../../config/application';

const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

const userSchema = new Schema({
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

  location: {
    type: String,
    default: 'Croatia'
  },

  theme: {
    type: Number,
    default: 0
  },

  userLevel: {
    type: Number
    // default:
  },

  karmaPoints: {
    type: Number
  },

  // RELATIONS

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
}, {
  toObject: {
    transform(document: any) {
      const {id, username, createdAt, updatedAt, userLevel, theme} = document;
      return {id, username, createdAt, updatedAt, userLevel, theme,
        email: document.local.email,
        karmaPoints: document.karma
      };
    }
  }
});

userSchema.methods.generateHash = function(password: string) {
  return hashSync(password, genSaltSync(8));
};

userSchema.methods.validPassword = function(password: string) {
  return compareSync(password, this.local.password);
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

export default mongoose.model('User', userSchema);
