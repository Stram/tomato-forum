import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

import serializer from './serializer';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const threadSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },

  // RELATIONS
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  category: {
    type: ObjectId,
    ref: 'Category'
  }
});

threadSchema.plugin(mongoosePaginate);

threadSchema.options.toObject = threadSchema.options.toObject ? threadSchema.options.toObject : {};
threadSchema.options.toObject.transform = serializer;

threadSchema.plugin(deepPopulate(mongoose));


module.exports = mongoose.model('Thread', threadSchema);
