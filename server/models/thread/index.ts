// TODO: Add pre save to update updated at

import threadSchema from 'models/thread/schema';
import Model from 'services/orm/model';
import QueryBuilder from 'services/query-builder';

export interface ICreateThread {
  title: string;
}

export interface IThread {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

class Thread {
  private document: IThread;
  private static model = new Model<IThread>('Thread', threadSchema);

  constructor(document: IThread) {
    this.document = document;
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
    const queryBuilder = new QueryBuilder();
    queryBuilder.select()
      .where('id', id)
      .limit(1);

    return this.model.query(queryBuilder)
      .then((document: IThread) => {
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

export default Thread;
