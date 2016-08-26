import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import Backbone from 'backbone';
import router from 'application/router';

import style from './style.scss';
import template from './template.hbs';
import session from 'services/session';

const applicationChannel = Radio.channel('application');

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
    'click @ui.logoutButton': 'logout',
    'click a': 'navigate'
  },

  channelName: 'sidebar',

  radioEvents: {
    'sidebar:show': 'show',
    'sidebar:hide': 'hide'
  },

  initialize() {

    this.hide();
    this.currentUser = session.getCurrentUser();

    const channel = Radio.channel('sidebar');
    this.listenTo(channel, 'sidebar:show', this.show);
    this.listenTo(channel, 'sidebar:hide', this.hide);
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
            label: 'logout',
            link: '#',
            active: currentPage === '#'
          }, {
            label: 'settings',
            link: '#',
            active: currentPage === '#'
          }, {
            label: 'help',
            link: '#',
            active: currentPage === '#'
          }]
        }
      }
    };
  },

  hide() {
    applicationChannel.trigger('overlay:hide');
    this.$el.addClass(style.isHidden);
  },

  show() {
    applicationChannel.trigger('overlay:show');
    this.$el.removeClass(style.isHidden);
  },

  logout() {
    session.logout();
  },

  navigate(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    router.navigate(href, true);
    this.hide();
  }
});
