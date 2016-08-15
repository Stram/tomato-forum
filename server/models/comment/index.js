import mongoose from 'mongoose';

import objectTransformation from '../helpers/standard-transformation';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: new Date()
  },

  thread: {
    type: ObjectId,
    ref: 'Thread'
  },

  user: {
    type: ObjectId,
    ref: 'User'
  }
});

commentSchema.options.toObject = commentSchema.options.toObject ? commentSchema.options.toObject : {};
commentSchema.options.toObject.transform = objectTransformation;

module.exports = mongoose.model('Comment', commentSchema);
