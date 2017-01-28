import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import {validateCategoryName} from 'services/validator';

const categorySchema = new mongoose.Schema({
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

  // threads: [{
  //   type: ObjectId,
  //   ref: 'Thread'
  // }]
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

export default categorySchema;
