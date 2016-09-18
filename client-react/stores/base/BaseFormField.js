import {extendObservable, computed, action} from 'mobx';
import {compact, omit} from 'lodash';

import BaseObservable from './BaseObservable';

const typeValidators = {
  email: ['email']
};

export default class BaseFormField extends BaseObservable {

  _initData(stores, initialState) {
    this._validatorInstances = {};
    this._validators = initialState._validators;
    const props = Object.keys(initialState);
    extendObservable(this, omit(initialState, '_validators'));

    const validators = [...(initialState.validate || []), ...(typeValidators[initialState.type] || [])];

    this._validatorInstances = validators.map((key) => ({
      fn: this._validators[key](),
      name: key
    }));

    for (const key of props) {
      if (key in this._validators) {
        this._validatorInstances.push({
          fn: this._validators[key](initialState[key]),
          name: key
        });
      }
    }

    this.onChange = (e) => this.setValue(this._getTargetValue(e.target));
  }

  _getTargetValue(target) {
    return this.type === 'checkbox' ? target.checked : target.value;
  }

  @computed get valid() {
    return this.errors.reduce((fieldState, error) => fieldState && !error, true);
  }

  @computed get errors() {
    return compact(this._validatorInstances.map((validator) => !validator.fn(this) && validator.name));
  }

  @action setValue(value) {
    this.dirty = true;
    return (this.value = value);
  }

  @action reset() {
    const newValue = this.setValue(this.defaultValue, true);
    this.dirty = false;
    return newValue;
  }
}
