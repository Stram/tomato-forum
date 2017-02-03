// TODO: Add pre save to update updated at

import BaseModel from 'models/model.interface';
import {ICreateThread, IThread} from 'models/thread/interfaces';
import threadSchema from 'models/thread/schema';
import Model from 'services/orm/model';

class Thread extends BaseModel<IThread> {
  constructor(document: IThread) {
    const model = new Model('Thread', threadSchema);
    super(document);
  }

  serialize() {
    const document = this.document;
    const {id, title, content, createdAt} = document;
    return {id, title, content, createdAt};
  }

  static query(query: any) {
    return new Promise <Array<Thread>> ((resolve, reject) => {
      // this.model.find(query).exec().then((documents: Array<IThread>) => {
      //   resolve(documents.map((document: IThread) => new Thread(document)));
      // });
    });
  }

  static find(id: number) {
    return this.findById(id).then((document: IThread) => {
      return new Thread(document);
    });
  }

  static create(userOptions: ICreateThread) {
    // const newDocument = new this.model(userOptions);
    // return newDocument.save().then((user: IThread) => {
    //   return new Thread(user);
    // });
  }

  get id() {
    return this.document.id;
  }
}

Thread.find

export default Thread;
