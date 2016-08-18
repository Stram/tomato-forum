import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

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
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  comments: [{
    type: ObjectId,
    ref: 'Comment'
  }]
});

threadSchema.plugin(mongoosePaginate);

threadSchema.options.toObject = threadSchema.options.toObject ? threadSchema.options.toObject : {};
threadSchema.options.toObject.transform = objectTransformation;

module.exports = mongoose.model('Thread', threadSchema);
