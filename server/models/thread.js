import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const photoSchema = new Schema({
  title: String,
  owner: {
    type: ObjectId,
    ref: 'userSchema'
  },
  content: String,
  createdAt: Date
});

photoSchema.options.toObject = photoSchema.options.toObject ? photoSchema.options.toObject : {};
photoSchema.options.toObject.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Photo', photoSchema);
