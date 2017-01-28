import * as mongoose from 'mongoose';

interface ICreateComment {
  content: string;
}

interface IComment extends mongoose.Document {
  id: string;
  content: string;
  createdAt: Date;
}

export {
  ICreateComment,
  IComment
}
