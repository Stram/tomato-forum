import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';

const {ObjectId} = mongoose.Schema.Types;

const threadSchema = new mongoose.Schema({
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
  // owner: {
  //   type: ObjectId,
  //   ref: 'User'
  // },
  // category: {
  //   type: ObjectId,
  //   ref: 'Category'
  // }
});

threadSchema.plugin(mongoosePaginate);
threadSchema.plugin(deepPopulate(mongoose));

export default threadSchema;
