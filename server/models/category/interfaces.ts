import * as mongoose from 'mongoose';

interface ICreateCategory {
  name: string;
}

interface ICategory extends mongoose.Document {
  id: string;
  name: string;
  createdAt: Date;
}

export {
  ICreateCategory,
  ICategory
}
