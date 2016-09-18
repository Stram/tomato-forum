export default class BaseObservable {

  constructor(stores, initialState) {
    this.storeWillInitialize(stores, initialState);
    this._initData(stores, initialState);
  }

  storeWillInitialize(/* stores */) {
    return;
  }

  storeDidInitialize(/* stores */) {
    return;
  }
}
