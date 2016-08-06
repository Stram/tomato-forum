import Backbone from 'backbone';
import Category from 'models/category';

import config from 'config';

const Categories = Backbone.Collection.extend({
  model: Category,
  url: `${config.apiEndpoint}/categories`
});

export default new Categories();
