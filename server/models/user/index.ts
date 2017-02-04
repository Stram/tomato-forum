// TODO: Add pre save to update updated at

import {hashSync, compareSync, genSaltSync} from 'bcrypt-nodejs';

import userSchema from 'models/user/schema';
import Model from 'services/orm/model';
import QueryBuilder from 'services/query-builder';

interface IUser {
  id?: number;
  username?: string;
  email: string;
  password: string;
  token?: string;
  createdAt?: Date;
  updatedAt?: Date;
  lastActivity?: Date;
}

export default class User {
  private document: IUser;
  private static model = new Model<IUser>('User', userSchema);

  constructor(document: IUser) {
    this.document = document;
  }

  static generateHash(password: string) {
    return hashSync(password, genSaltSync(8));
  }

  validatePassword(password: string) {
    return compareSync(password, this.document.password);
  }

  serialize() {
    const document = this.document;
    const {id, username, email, createdAt, updatedAt} = document;
    return {id, username, email, createdAt, updatedAt};
  }

  static find(id: number): Promise<User> {
    const queryBuilder = new QueryBuilder();
    queryBuilder.select()
      .where('id', id)
      .limit(1);

    return this.model.query(queryBuilder)
      .then((document: IUser) => {
        return new User(document);
      });
  }

  static findOne(query: {}) {
    return new Promise <User> ((resolve: Function, reject: Function) => {
      // FIXME
      // this.model.findOne(query).exec().then((document: IUser) => {
      //   resolve(new User(document));
      // }, (error: any) => {
      //   reject(error);
      // });
    });
  }

  static query(query: {} | string) {
    return new Promise <Array<User>> ((resolve, reject) => {

      // this.model.find(query).exec().then((documents: Array<IUser>) => {
      //   resolve(documents.map((document: IUser) => new User(document)));
      // });
    });
  }

  static create(userOptions: IUser) {
    return new User();
    // userOptions.password = this.generateHash(userOptions.password);
    // const newDocument = this.model.create(userOptions);
    // return newDocument.save().then((user: IUser) => {
    //   return new User(user);
    // });
  }

  get id() {
    return this.document.id;
  }
}
