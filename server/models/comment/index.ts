import * as mongoose from 'mongoose';

import serializer from './serializer';
import IModel from 'models/model.interface';
import commentSchema from 'models/comment/schema';
import {ICreateComment, IComment} from 'models/comment/interfaces';

class Comment implements IModel {
  private _document: IComment;
  private static _model = mongoose.model <IComment> ('Comment', commentSchema);

  constructor(document: IComment) {
    this._document = document;
  }

  serialize() {
    const document = this._document;
    const {id, content, createdAt} = document;
    return {id, content, createdAt};
  }
}
