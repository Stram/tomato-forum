import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

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
}, {
  toObject: {
    transform(document: any) {
      const {id, title, content, createdAt, category} = document;
      return {id, title, content, createdAt, category};
    }
  }
});

threadSchema.plugin(mongoosePaginate);
threadSchema.plugin(deepPopulate(mongoose));

export default mongoose.model('Thread', threadSchema);
