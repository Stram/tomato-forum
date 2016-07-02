import Backbone from 'backbone';
import Thread from 'models/thread';

import config from 'config';

const Forum = Backbone.Collection.extend({
  model: Thread,
  url: `${config.apiEndpoint}/thread`
});

export default new Forum();
