// TODO: Add pre save to update updated at

import * as mongoose from 'mongoose';
// import mongooseDeepPopulate from 'mongoose-deep-populate';
import {hashSync, compareSync, genSaltSync} from 'bcrypt-nodejs';
// import randToken from 'rand-token';

import userSchema from 'models/user/schema';
import IModel from 'models/model.interface';
import {ICreateUser, IUser} from 'models/user/interfaces';

const _model = mongoose.model <IUser> ('User', userSchema);

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
      }, (error: any) => {
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
