import Backbone from 'backbone';

import config from 'config';

export default Backbone.AssociatedModel.extend({
  urlRoot: `${config.apiEndpoint}/users`
});
