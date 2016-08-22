import Backbone from 'backbone';

import FormView from 'components/form';

export default class BaseForm {
  constructor(attributes = {}) {
    this.model = attributes.model;
    this.propertyModel = Backbone.Model;
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
      // formView.children.each((view) => {
      //   this.model.set(view.name, view.getValue());
      // });
    } else {
      throw new Error('Cannot get form view');
    }

    if (this.model) {
      this.model.save();
    }
  }

  _setupFormView() {
    this.formView = new FormView({
      formProperties: this.properties
    });

    this.formView.on('submit', this.submit.bind(this));
  }
}
