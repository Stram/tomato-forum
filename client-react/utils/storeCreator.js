import {forEach, isObject, isFunction} from 'lodash';

export default function(dataStoreList, uiStoreList) {
  return function(initialState = {}) {
    const stores = {
      ui: {}
    };

    forEach(dataStoreList, (Store, storeName) => {
      const state = initialState[storeName];
      stores[storeName] = new Store(stores, isObject(state) ? state : {});
    });

    const initialUiState = isObject(initialState.ui) ? initialState.ui : {};

    forEach(uiStoreList, (Store, storeName) => {
      const state = initialUiState[storeName];
      stores.ui[storeName] = new Store(stores, isObject(state) ? state : {});
    });

    forEach(stores, function(store, key) {
      if (key !== 'ui' && isFunction(store.storeDidInitialize)) {
        store.storeDidInitialize(stores);
      }
    });

    forEach(stores.ui, function(store) {
      if (isFunction(store.storeDidInitialize)) {
        store.storeDidInitialize(stores);
      }
    });

    return stores;
  };
}
