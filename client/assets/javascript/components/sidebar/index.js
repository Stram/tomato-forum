import Marionette from 'backbone.marionette';
import Backbone from 'backbone';

import style from './style.scss';
import template from './template.hbs';
import session from 'application/session';

export default Marionette.View.extend({

  template,

  tagName: 'aside',

  className: style.sidebar,

  attributes: {
    id: 'sidebar'
  },

  ui: {
    logoutButton: '.js-logout'
  },

  events: {
    'click @ui.logoutButton': 'logout'
  },

  templateContext() {
    const currentPage = Backbone.history.getFragment();
    return {
      style,
      currentUser: this.currentUser,
      navigations: {
        primary: {
          className: style.mainNavigation,
          items: [{
            label: 'dashboard',
            link: 'dashboard',
            active: currentPage === 'dashboard'
          }, {
            label: 'forum',
            link: 'forum',
            active: currentPage === 'forum'
          }, {
            label: 'objave',
            link: '#',
            active: currentPage === '#'
          }, {
            label: 'profili',
            link: '#',
            active: currentPage === '#'
          }]
        },
        secondary: {
          className: style.secondaryNavigation,
          items: [{
            label: 'dashboard',
            link: 'dashboard',
            active: currentPage === 'dashboard'
          }, {
            label: 'forum',
            link: 'forum',
            active: currentPage === 'forum'
          }, {
            label: 'objave',
            link: '#',
            active: currentPage === '#'
          }, {
            label: 'profili',
            link: '#',
            active: currentPage === '#'
          }]
        }
      }
    };
  },

  initialize() {
    this.currentUser = session.getCurrentUser();
  },

  logout() {
    session.logout();
  }
});
