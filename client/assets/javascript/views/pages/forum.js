import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/forum.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page forum-page',

  events: {

  },

  template,


  render() {

    this.$el.html(
      _.template(
        this.template({
        })
      )
    );

    return this;
  },

  close() {
    this.remove();
  }
});
