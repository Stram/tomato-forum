import $ from 'jquery';
import config from 'config';

import BaseForm from 'forms/base-form';

export default class CategoryForm extends BaseForm {
  constructor() {
    super(...arguments);

    this.properties = {
      email: {
        name: 'email',
        type: 'text',
        options: {
          type: 'email',
          label: 'Email address',
          required: true
        }
      },

      password: {
        name: 'password',
        type: 'text',
        options: {
          type: 'password',
          label: 'Password',
          required: true
        }
      }
    };
  }

  submit() {
    super.submit();
    const data = this.values;

    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${config.apiEndpoint}/users/register`,
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
