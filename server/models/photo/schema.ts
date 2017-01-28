import * as mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  name: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  // user: {
  //   type: ObjectId,
  //   ref: 'User'
  // }
});

export default photoSchema;
