import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
// import deepPopulate from 'mongoose-deep-populate';

import {validateCategoryName} from 'services/validator';

const {Schema} = mongoose;
const {ObjectId} = Schema.Types;

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
    default: Date.now
  },
  allowNewThreads: {
    type: Boolean,
    default: true
  },

  threads: [{
    type: ObjectId,
    ref: 'Thread'
  }]
}, {
  toObject: {
    transform(document: any) {
      const {id, name, createdAt, allowNewThreads, threads} = document;
      return {id, name, createdAt, allowNewThreads, threads};
    }
  }
});

categorySchema.plugin(mongoosePaginate);

// categorySchema.plugin(deepPopulate(mongoose), {
//   populate: {
//     threads: {
//       options: {
//         limit: 5
//       }
//     }
//   }
// });

export default mongoose.model('Category', categorySchema);
