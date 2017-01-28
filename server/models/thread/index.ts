// TODO: Add pre save to update updated at

import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

import IModel from 'models/model.interface';

const {ObjectId} = mongoose.Schema.Types;

interface ICreateThread {
  title: string;
}

interface IThread extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}


const threadSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  content: String,

  createdAt: {
    type: Date,
    default: Date.now
  },

  // RELATIONS
  // owner: {
  //   type: ObjectId,
  //   ref: 'User'
  // },
  // category: {
  //   type: ObjectId,
  //   ref: 'Category'
  // }
});

threadSchema.plugin(mongoosePaginate);
threadSchema.plugin(deepPopulate(mongoose));

const _model = mongoose.model <IThread> ('Thread', threadSchema);

class Thread implements IModel {
  private _document: IThread;

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
      _model.findOne(query).exec().then((document: IThread) => {
        resolve(new this(document));
      }, (error: any) => {
        reject(error);
      });
    });
  }

  static query(query: any) {
    return new Promise <Array<Thread>> ((resolve, reject) => {
      _model.find(query).exec().then((documents: Array<IThread>) => {
        resolve(documents.map((document: IThread) => new Thread(document)));
      });
    });
  }

  static findById(id: string) {
    return new Promise <Thread> ((resolve, reject) => {
      _model.findById(id).exec().then((document: IThread) => {
        resolve(new Thread(document));
      });
    });
  }

  static create(userOptions: ICreateThread) {
    const newDocument = new _model(userOptions);
    return newDocument.save().then((user: IThread) => {
      return new Thread(user);
    });
  }

  get id() {
    return this._document.id;
  }
}

// export default mongoose.model('Thread', threadSchema);
