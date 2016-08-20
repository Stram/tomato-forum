import Marionette from 'backbone.marionette';

import template from './template.hbs';
import router from 'application/router';
import session from 'application/session';

export default Marionette.View.extend({

  template,

  tagName: 'article',

  className: 'content-wrapper',

  regions: {
    content: {
      el: '#page-content'
    }
  },

  navigate(event) {
    const page = event.target.dataset.page;
    router.navigate(page, true);
  },

  logout() {
    session.logout();
  }
});
