import {Types, Defaults} from 'services/orm/model';

export default {
  title: {
    type: Types.string(30),
    required: 'Title is required property'
  },

  content: {
    type: Types.text()
  },

  createdAt: {
    type: Types.timestamp(),
    default: Defaults.TODAY
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
