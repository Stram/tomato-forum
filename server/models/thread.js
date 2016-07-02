import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const threadSchema = new Schema({
  title: String,
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  content: String,
  createdAt: Date
});

threadSchema.options.toObject = threadSchema.options.toObject ? threadSchema.options.toObject : {};
threadSchema.options.toObject.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Thread', threadSchema);
