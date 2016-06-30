import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from 'views/templates/content-wrapper.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'content-wrapper',

  events: {

  },

  template,

  $pageContent: $('.js-wrapped-page-content'),

  render() {

    this.$el.html(
      _.template(
        this.template()
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
  }
});
