import mongoose from 'mongoose';

import objectTransformation from '../helpers/standard-transformation';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const threadSchema = new Schema({
  title: String,
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  content: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }]
});

threadSchema.options.toObject = threadSchema.options.toObject ? threadSchema.options.toObject : {};
threadSchema.options.toObject.transform = objectTransformation;

module.exports = mongoose.model('Thread', threadSchema);
