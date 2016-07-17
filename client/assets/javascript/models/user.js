import Backbone from 'backbone';

import config from 'config';

export default Backbone.Model.extend({
  urlRoot: `${config.apiEndpoint}/users`
});
