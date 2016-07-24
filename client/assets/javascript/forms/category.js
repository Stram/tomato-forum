import _ from 'underscore';

import BaseForm from 'forms/base-form';

import colorsEnum from 'enum/colors';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);
    this.modelName = 'category';

    this.properties = {
      name: {
        type: 'text'
      },

      allowNewThreads: {
        type: 'switch'
      },

      color: {
        type: 'text',
        options: _.values(colorsEnum)
      }
    };
  }

}
