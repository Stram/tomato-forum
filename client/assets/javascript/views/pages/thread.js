import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/thread.html';
import loadingTemplate from 'views/templates/loading.html';

import Thread from 'models/thread';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page thread-page',

  events: {

  },

  template,
  loadingTemplate,

  initialize(args) {
    const self = this;
    this.threadLoaded = false;
    this.thread = new Thread({id: args.threadId});
    this.thread.fetch({
      success() {
        self.threadLoaded = true;
        self.render();
      }
    });

    // this.listenTo(this.thread, 'change reset', this.render);
  },

  render() {
    if (this.threadLoaded) {
      this.$el.html(
        _.template(
          this.template({
            thread: this.thread
          })
        )
      );
    } else {
      this.$el.html(
        this.loadingTemplate()
      );
    }

    return this;
  },

  close() {
    this.remove();
  }
});
