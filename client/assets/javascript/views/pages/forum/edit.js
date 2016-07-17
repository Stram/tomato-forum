import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/forum/edit.html';

import Forum from 'collections/forum';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page forum-edit-page',

  events: {},

  template,

  initialize() {
    Forum.fetch();
    this.listenTo(Forum, 'change reset add remove', this.render);
  },

  render() {
    this.$el.html(
      _.template(
        this.template()
      )
    );

    return this;
  },

  close() {
    this.remove();
  }
});
