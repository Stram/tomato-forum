import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

import serializer from './serializer';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
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
commentSchema.options.toObject.transform = serializer;

commentSchema.plugin(deepPopulate(mongoose));

module.exports = mongoose.model('Comment', commentSchema);
