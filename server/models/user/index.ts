// TODO: Add pre save to update updated at

import * as mongoose from 'mongoose';
// import mongooseDeepPopulate from 'mongoose-deep-populate';
import {hashSync, compareSync, genSaltSync} from 'bcrypt-nodejs';
// import randToken from 'rand-token';

import {validateEmail, validateUsername} from 'services/validator';
import IModel from 'models/model.interface';

// import applicationConfig from '../../config/application';

const {ObjectId} = mongoose.Schema.Types;

interface ICreateUser {
  email: string;
  password: string;
}

interface IUser extends mongoose.Document {
  id: string;
  username: string;
  local: {
    email: string,
    password: string
  };

  token: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivity: Date;
}

const userSchema: mongoose.Schema = new mongoose.Schema({
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

var _model = mongoose.model <IUser> ('User', userSchema);

class User implements IModel {
  private _document: IUser;

  constructor(document: IUser) {
    this._document = document;
  }

  static generateHash(password: string) {
    return hashSync(password, genSaltSync(8));
  }

  validatePassword(password: string) {
    return compareSync(password, this._document.local.password);
  }

  serialize() {
    const document = this._document;
    const {id, username, createdAt, updatedAt} = document;
    return {id, username, createdAt, updatedAt,
      email: document.local.email
    };
  }

  static findById(query: {}) {
    return new Promise <User> ((resolve, reject) => {
      _model.findById(query).exec().then((document: IUser) => {
        resolve(new User(document));
      });
    });
  }

  static findOne(query: {}) {
    return new Promise <User> ((resolve: Function, reject: Function) => {
      _model.findOne(query).exec().then((document: IUser) => {
        resolve(new User(document));
      }, (error) => {
        reject(error);
      });
    });
  }

  static query(query: {} | string) {
    return new Promise <Array<User>> ((resolve, reject) => {
      _model.find(query).exec().then((documents: Array<IUser>) => {
        resolve(documents.map((document: IUser) => new User(document)));
      });
    });
  }

  static create(userOptions: ICreateUser) {
    userOptions.password = this.generateHash(userOptions.password);
    const newDocument = new _model(userOptions);
    return newDocument.save().then((user: IUser) => {
      return new User(user);
    });
  }

  get id() {
    return this._document.id;
  }
}

export default User
