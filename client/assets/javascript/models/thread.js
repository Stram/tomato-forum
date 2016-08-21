import Backbone from 'backbone';

import config from 'config';
import Comment from './comment';
import User from './user';

export default Backbone.AssociatedModel.extend({
  urlRoot: `${config.apiEndpoint}/threads`,

  relations: [{
    type: Backbone.Many,
    key: 'comments',
    relatedModel: Comment
  }, {
    type: Backbone.One,
    key: 'owner',
    relatedModel: User
  }]
});
