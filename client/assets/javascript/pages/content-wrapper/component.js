import Marionette from 'backbone.marionette';

import template from './template.hbs';
import {router} from 'router/main';
import session from 'session';

import SidebarView from 'components/sidebar/component';

export default Marionette.View.extend({

  template,

  tagName: 'article',

  className: 'content-wrapper',

  regions: {
    sidebar: {
      el: '#sidebar',
      replaceEl: true
    },
    content: {
      el: '#page-content'
    }
  },

  onBeforeAttach() {
    this.showChildView('sidebar', new SidebarView());
  },

  navigate(event) {
    const page = event.target.dataset.page;
    router.navigate(page, true);
  },

  logout() {
    session.logout();
  }
});
