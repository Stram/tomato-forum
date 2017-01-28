import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import deepPopulate from 'mongoose-deep-populate';


const commentSchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now
  },

  // thread: {
  //   type: ObjectId,
  //   ref: 'Thread'
  // },
  //
  // owner: {
  //   type: ObjectId,
  //   ref: 'User'
  // }
});

commentSchema.plugin(mongoosePaginate);

export default commentSchema;
