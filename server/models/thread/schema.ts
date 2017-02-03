import {Types} from 'services/orm/model';

export default {
  title: {
    type: Types.string(30),
    required: true
  },

  content: {
    type: Types.text()
  },

  createdAt: {
    type: Types.timestamp(),
    default: 'TODAY'
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
};
