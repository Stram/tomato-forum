import Marionette from 'backbone.marionette';

import template from './template.hbs';

import session from 'services/session';

export default Marionette.View.extend({
  tagName: 'article',

  className: 'page dashboard-page',

  template,

  initialize() {
    this.currentUser = session.getCurrentUser();
  },

  templateContext() {
    return {
      currentUser: this.currentUser
    };
  }
});
