// TODO: Add pre save to update updated at

import * as mongoose from 'mongoose';

import IModel from 'models/model.interface';
import {ICreateThread, IThread} from 'models/thread/interfaces';
import threadSchema from 'models/thread/schema';

class Thread implements IModel {
  private _document: IThread;
  private static _model = mongoose.model <IThread> ('Thread', threadSchema);;

  constructor(document: IThread) {
    this._document = document;
  }

  serialize() {
    const document = this._document;
    const {id, title, content, createdAt} = document;
    return {id, title, content, createdAt};
  }

  static findOne(query: Object) {
    return new Promise <Thread> ((resolve: Function, reject: Function) => {
      this._model.findOne(query).exec().then((document: IThread) => {
        resolve(new this(document));
      }, (error: any) => {
        reject(error);
      });
    });
  }

  static query(query: any) {
    return new Promise <Array<Thread>> ((resolve, reject) => {
      this._model.find(query).exec().then((documents: Array<IThread>) => {
        resolve(documents.map((document: IThread) => new Thread(document)));
      });
    });
  }

  static findById(id: string) {
    return new Promise <Thread> ((resolve, reject) => {
      this._model.findById(id).exec().then((document: IThread) => {
        resolve(new Thread(document));
      });
    });
  }

  static create(userOptions: ICreateThread) {
    const newDocument = new this._model(userOptions);
    return newDocument.save().then((user: IThread) => {
      return new Thread(user);
    });
  }

  get id() {
    return this._document.id;
  }
}

export default Thread;
