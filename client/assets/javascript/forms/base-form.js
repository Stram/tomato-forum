import Backbone from 'backbone';
import _ from 'underscore';

import FormView from 'collection-views/form/component';

export default class BaseForm {
  constructor(attributes) {
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
      formView.children.each((view) => {
        this.model.set(view.name, view.getValue());
      });
    } else {
      throw new Error('Cannot get form view');
    }

    this.model.save();
  }

  _setupFormView() {
    const PropertyModel = Backbone.Model.extend({
      idAttribute: 'cid'
    });

    const PropertiesCollection = Backbone.Collection.extend({
      model: PropertyModel
    });


    this.propertiesCollection = new PropertiesCollection(
      _.values(this.properties).map((property) => new PropertyModel(property))
    );

    this.formView = new FormView({
      collection: this.propertiesCollection
    });

    this.formView.on('submit', this.submit);
  }
}
