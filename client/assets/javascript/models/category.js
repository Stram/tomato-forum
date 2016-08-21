import Backbone from 'backbone';

import config from 'config';
import Thread from './thread';

export default Backbone.AssociatedModel.extend({
  urlRoot: `${config.apiEndpoint}/categories`,

  relations: [{
    type: Backbone.Many,
    key: 'threads',
    relatedModel: Thread
  }]
});
