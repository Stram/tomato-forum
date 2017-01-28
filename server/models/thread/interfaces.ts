import * as mongoose from 'mongoose';

interface ICreateThread {
  title: string;
}

interface IThread extends mongoose.Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export {
  ICreateThread,
  IThread
}
