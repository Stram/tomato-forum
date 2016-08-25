import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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

  owner: {
    type: ObjectId,
    ref: 'User'
  }
});

commentSchema.plugin(mongoosePaginate);

commentSchema.options.toObject = commentSchema.options.toObject ? commentSchema.options.toObject : {};
commentSchema.options.toObject.transform = objectTransformation;

module.exports = mongoose.model('Comment', commentSchema);
