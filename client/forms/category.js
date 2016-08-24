import BaseForm from 'forms/base-form';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);
    this.modelName = 'category';

    this.properties = {
      name: {
        name: 'name',
        type: 'text'
      },

      allowNewThreads: {
        name: 'allowNewThreads',
        type: 'switch'
      },

      color: {
        name: 'color',
        type: 'color-select'
      }
    };
  }
}
