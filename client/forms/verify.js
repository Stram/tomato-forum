import $ from 'jquery';
import config from 'config';

import BaseForm from 'forms/base-form';

export default class CategoryForm extends BaseForm {
  constructor(options) {
    super(...arguments);

    this.userId = options.userId;
    this.token = options.token;

    this.properties = {
      username: {
        name: 'username',
        type: 'text',
        options: {
          type: 'text',
          label: 'Username',
          required: true
        }
      }
    };
  }

  submit() {
    super.submit();
    const data = this.values;
    data.userId = this.userId;
    data.token = this.token;

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${config.apiEndpoint}/users/verify`,
        method: 'POST',
        data
      }).done((response) => {
        this.formView.clearErrors();
        resolve(response);
      }).fail((jqXHR) => {
        const errors = jqXHR.responseJSON.errors;
        this.formView.showErrors(errors);
        reject(errors);
      });
    });
  }
}
