import PageableCollection from 'backbone.paginator';
import Thread from 'models/thread';

import config from 'config';

const Threads = PageableCollection.extend({
  model: Thread,
  url: `${config.apiEndpoint}/threads`,

  parseRecords(response) {
    return response.items;
  },

  parseState(resp) {
    return {
      totalRecords: resp.meta.total
    };
  },

  queryParams: {
    currentPage: 'page',
    pageSize: 'perPage'
  },

  state: {
    pageSize: 5
  }

});

export default Threads;
