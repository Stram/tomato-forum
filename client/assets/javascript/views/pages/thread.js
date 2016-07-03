import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from 'views/templates/thread.html';
import loadingTemplate from 'views/templates/loading.html';

import session from 'session';

import Thread from 'models/thread';
import Comment from 'models/comment';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page thread-page',

  events: {
    'click .js-new-comment': 'postNewComment'
  },

  template,
  loadingTemplate,

  initialize(args) {
    const self = this;
    this.loading = true;
    this.thread = new Thread({id: args.threadId});

    this.thread.fetch().then(() => {
      self.loading = false;
      self.render();
    });

    // this.listenTo(this.thread, 'change', this.render);
  },

  render() {
    if (!this.loading) {
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
  },

  postNewComment() {
    const self = this;

    const commentContent = $('.js-new-comment-content').val();
    const newComment = new Comment({
      content: commentContent,
      user: session.getCurrentUser().id,
      thread: this.thread
    });

    newComment.save({}, {
      success(model, response) {
        const comments = self.thread.get('comments');
        comments.push(response);
        self.thread.set('comments', comments);
        // self.thread.trigger('change');
        self.render();
      }
    });
  }
});
