import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from 'views/templates/content-wrapper.html';

import {router} from 'router/main';
import session from 'session';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'content-wrapper',

  events: {
    'click .js-logout': 'logout',
    'click .js-navigate': 'navigate'
  },

  template,

  $pageContent: $('.js-wrapped-page-content'),

  render() {

    this.$el.html(
      _.template(
        this.template({
          currentUser: session.getCurrentUser()
        })
      )
    );

    return this;
  },

  close() {
    this.currentView.close();
    this.remove();
  },

  changeCurrentView(view) {
    if (this.currentView) {
      this.currentView.close();
    }

    if (!this.$pageContent.length) {
      this.$pageContent = $('.js-wrapped-page-content');
    }

    this.currentView = view;
    view.render();

    this.$pageContent.html(view.el);

    console.log(`changing wrapped view to ${view.className}`);
  },

  navigate(event) {
    const page = event.target.dataset.page;
    router.navigate(page, true);
  },

  logout() {
    session.logout();
  }
});
