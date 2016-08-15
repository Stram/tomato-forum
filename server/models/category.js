import mongoose from 'mongoose';
import deepPopulate from 'mongoose-deep-populate';

import { validateCategoryName } from '../services/validate';

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
    default: new Date()
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

categorySchema.options.toObject = categorySchema.options.toObject ? categorySchema.options.toObject : {};
categorySchema.options.toObject.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

categorySchema.plugin(deepPopulate(mongoose), {
  populate: {
    threads: {
      options: {
        limit: 10
      }
    }
  }
});

module.exports = mongoose.model('Category', categorySchema);
