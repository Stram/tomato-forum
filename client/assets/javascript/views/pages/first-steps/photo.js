import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/first-steps/photo.html';

import session from 'session';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page first-steps-photo-page',

  events: {

  },


  template,

  initialize() {

  },

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
    this.remove();
  }
});
