import $ from 'jquery';

import uiStore from 'stores/ui-store';
import config from 'config';

class TransportLayer {
  fetch(options) {
    const url = `${config.apiEndpoint}${options.urlEndpoint}`;
    const data = options.data || {};
    const method = options.method || 'GET';

    return new Promise((resolve, reject) => {
      uiStore.pendingRequestCount++;
      $.ajax({
        url,
        data,
        method
      }).done((response) => {
        resolve(response);
        uiStore.pendingRequestCount--;
      }).fail((error) => {
        reject(error);
      });
    });
  }
}

const singleton = new TransportLayer();
export default singleton;
