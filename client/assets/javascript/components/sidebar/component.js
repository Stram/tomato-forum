import Marionette from 'backbone.marionette';

import template from './template.hbs';
import router from 'router/main';
import session from 'session';

export default Marionette.View.extend({

  template,

  tagName: 'aside',

  className: 'sidebar',

  attributes: {
    id: 'sidebar'
  },

  ui: {
    logoutButton: '.js-logout'
  },

  events: {
    'click @ui.logoutButton': 'logout',
    'click .js-navigate': 'navigate'
  },

  templateContext() {
    return {
      sidebarItems: [{
        label: this.currentUser.username,
        link: `profile/${this.currentUser.id}`
      }, {
        label: 'dashboard',
        link: 'dashboard'
      }, {
        label: 'forum',
        link: 'forum'
      }]
    };
  },

  initialize() {
    this.currentUser = session.getCurrentUser();
  },

  navigate(event) {
    const page = event.target.dataset.page;
    router.navigate(page, true);
  },

  logout() {
    session.logout();
  }
});
