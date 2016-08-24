import BaseForm from 'forms/base-form';
import Categories from 'collections/categories';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);
    this.modelName = 'thread';

    this.properties = {
      cateroryId: {
        name: 'categoryId',
        type: 'multiple',
        options: {
          label: 'Category',
          collection: Categories,
          labelProperty: 'name'
        }
      },
      title: {
        name: 'title',
        type: 'text',
        options: {
          required: true,
          label: 'Title'
        }
      },

      content: {
        name: 'content',
        type: 'textarea',
        options: {
          required: true,
          label: 'Content'
        }
      }
    };
  }
}
