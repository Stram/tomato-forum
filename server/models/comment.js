import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  content: String,
  createdAt: {
    type: Date,
    default: new Date()
  },

  thread: {
    type: ObjectId,
    ref: 'Thread'
  },
  
  user: {
    type: ObjectId,
    ref: 'User'
  }
});

commentSchema.options.toObject = commentSchema.options.toObject ? commentSchema.options.toObject : {};
commentSchema.options.toObject.transform = function(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;
  return ret;
};

module.exports = mongoose.model('Comment', commentSchema);
