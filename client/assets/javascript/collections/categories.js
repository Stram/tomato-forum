import Backbone from 'backbone';
import Category from 'models/category';

import config from 'config';

const Categories = Backbone.Collection.extend({
  model: Category,
  url: `${config.apiEndpoint}/categories`,

  parse(response) {
    return response.items;
  }
});

export default new Categories();
