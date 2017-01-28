import * as mongoose from 'mongoose';

import IModel from 'models/model.interface';
import categorySchema from 'models/category/schema';
import {ICreateCategory, ICategory} from 'models/category/interfaces';

class Category implements IModel {
  private _document: ICategory;
  private static _model = mongoose.model <ICategory> ('Category', categorySchema);

  constructor(document: ICategory) {
    this._document = document;
  }

  serialize() {
    const document = this._document;
    const {id, name, createdAt} = document;
    return {id, name, createdAt};
  }
}

export default Category;
