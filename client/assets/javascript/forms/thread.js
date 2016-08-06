import BaseForm from 'forms/base-form';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);
    this.modelName = 'thread';

    this.properties = {
      title: {
        name: 'title',
        type: 'text'
      },

      content: {
        name: 'content',
        type: 'text'
      }
    };
  }
}
