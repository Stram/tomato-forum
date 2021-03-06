import _ from 'underscore';

import FormView from 'components/form';

export default class BaseForm {
  constructor(attributes = {}) {
    this.model = attributes.model;
  }

  getForm() {
    if (!this.formView) {
      this._setupFormView();
    }

    return this.formView;
  }

  submit() {
    const formView = this.formView;
    if (formView) {
      this.values = formView.getValues();
    } else {
      throw new Error('Cannot get form view');
    }

    if (this.model) {
      _.pairs(this.values).forEach(([key, value]) => {
        this.model.set(key, value);
      });
      return new Promise((resolve, reject) => {
        this.model.save().then(() => {
          resolve();
        }, (response) => {
          if (response.responseJSON && response.responseJSON.errors) {
            const errorList = response.responseJSON.errors;
            this.formView.showErrors(errorList);
          }
          reject(response);
        });
      });
    }
    return false;
  }

  _setupFormView() {
    if (this.model) {
      this.properties = _.mapObject(this.properties, (property) => {
        property.options.value = this.model.get(property.name);
        return property;
      });
    }

    this.formView = new FormView({
      formProperties: this.properties
    });

    this.formView.on('submit', this.submit.bind(this));
  }
}
