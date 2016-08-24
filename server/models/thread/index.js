import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

import objectTransformation from '../helpers/standard-transformation';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const threadSchema = new Schema({
  title: {
    type: String,
    required: true
  },
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

threadSchema.plugin(deepPopulate(mongoose));


module.exports = mongoose.model('Thread', threadSchema);
