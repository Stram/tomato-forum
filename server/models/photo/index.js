import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

import serializer from './serializer';

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
photoSchema.options.toObject.transform = serializer;

module.exports = mongoose.model('Photo', photoSchema);
