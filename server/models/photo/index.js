import mongoose from 'mongoose';

import objectTransformation from '../helpers/standard-transformation';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const photoSchema = new Schema({
  name: String,
  url: String,
  user: {
    type: ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

photoSchema.options.toObject = photoSchema.options.toObject ? photoSchema.options.toObject : {};
photoSchema.options.toObject.transform = objectTransformation;

module.exports = mongoose.model('Photo', photoSchema);
