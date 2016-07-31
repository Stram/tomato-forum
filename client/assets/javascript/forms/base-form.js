// import _ from 'underscore';

// import FormView from 'components/form/component';
import FormView from 'collection-views/form/component';
// import formUtils from 'utils/form';

// const createFormPropertyObject = formUtils.createFormPropertyObject;

export default class BaseForm {
  constructor(attributes) {
    this.model = attributes.model;
  }

  getForm() {
    if (!this.form) {
      this._setupFormView();
    }

    return this.form;
  }

  submit() {
    // const propertyViews = this.form.propertyViews;
    // _.each(propertyViews, (view) => {
    //   this.model.set(view.name, view.getValue());
    // });
    //
    // this.model.save();
  }

  close() {
    // if (this.form) {
    //   this.form.close();
    // }
  }

  _setupFormView() {
    // const propertyViews = [];

    // const properties = _.keys(this.properties);
    // _.each(properties, (propertyName) => {
    //   const propertyOptions = this.properties[propertyName];
    //   propertyOptions.value = propertyOptions.value || this.model.get(propertyName);
    //   const propertyView = createFormPropertyObject(propertyName, propertyOptions);
    //   propertyViews.push(propertyView);
    // });

    this.form = new FormView({
      collection: this.properties
    });

    // this.form = new FormView({
    //   propertyViews
    // });

    // this.form.on('submit', this.submit);

    // this.form.render();
  }
}
