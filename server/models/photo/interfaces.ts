import * as mongoose from 'mongoose';

interface ICreatePhoto {
  name: string;
  url: string
}

interface IPhoto extends mongoose.Document {
  id: string;
  name: string;
  url: string;
  createdAt: Date;
}

export {
  ICreatePhoto,
  IPhoto
}
