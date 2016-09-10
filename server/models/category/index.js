import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

import { validateCategoryName } from '../../services/validate';
import serializer from './serializer';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: validateCategoryName,
      message: 'Category name is not valid'
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  allowNewThreads: {
    type: Boolean,
    default: true
  },

  threads: [{
    type: ObjectId,
    ref: 'Thread'
  }]
});

categorySchema.plugin(mongoosePaginate);

categorySchema.options.toObject = categorySchema.options.toObject || {};
categorySchema.options.toObject.transform = serializer;

categorySchema.plugin(deepPopulate(mongoose), {
  populate: {
    threads: {
      options: {
        limit: 5
      }
    }
  }
});

module.exports = mongoose.model('Category', categorySchema);
