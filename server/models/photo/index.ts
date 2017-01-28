import * as mongoose from 'mongoose';

import photoSchema from 'models/photo/schema';
import IModel from 'models/model.interface';
import {ICreatePhoto, IPhoto} from 'models/photo/interfaces';

class Photo implements IModel {
  private _document: IPhoto;
  private static _model = mongoose.model <IPhoto> ('Photo', photoSchema);

  constructor(document: IPhoto) {
    this._document = document;
  }

  serialize() {
    const document = this._document;
    const {id, name, url, createdAt} = document;
    return {id, name, url, createdAt};
  }
};

export default Photo;
