import {extendObservable, computed, action} from 'mobx';

import BaseObservable from './BaseObservable';
import BaseFormField from './BaseFormField';
import {EMAIL} from 'consts/regex';

export default class BaseForm extends BaseObservable {

  _initData(stores, initialState) {
    const fieldModels = {};
    this._initValidators();

    Object.assign(this._validators, this.validators || {});

    for (const field of Object.keys(this.fields)) {
      const fieldState = initialState && initialState[field];
      const initialFieldState = Object.assign({
        value: (fieldState && fieldState.value) ? initialState[field].value : this.fields[field].defaultValue,
        dirty: (fieldState && fieldState.dirty) || false,
        _validators: this._validators,
        name: field
      }, this.fields[field]);
      fieldModels[field] = new BaseFormField(stores, initialFieldState);
    }

    extendObservable(this, fieldModels);

    this.onSubmit = this.onSubmit.bind(this);
  }

  @computed get valid() {
    return this.fieldList.every((field) => field.valid);
  }

  @computed get errors() {
    const errors = {};
    this.fieldList.forEach((field) => {
      errors[field.name] = field.errors;
    });
    return errors;
  }

  _initValidators() {
    const self = this;
    this._validators = {

      required() {
        return (field) => Boolean(field.value);
      },

      minLength(length) {
        return (field) => field.value.length >= length || !field.value.length;
      },

      maxLength(length) {
        return (field) => field.value.length <= length;
      },

      email() {
        return (field) => EMAIL.test(field.value);
      },

      equals(fieldName) {
        return (field) => field.value === self[fieldName].value;
      }
    };
  }

  reset() {
    this.fieldList.map((field) => field.reset());
  }

  get fieldList() {
    return Object.keys(this.fields).map((field) => this[field]);
  }

  @action onSubmit(e) {
    e.preventDefault();

    if (this.valid) {

      // TODO: Do the request
    } else {
      this.fieldList.map((field) => (field.dirty = true));
    }
  }
}
