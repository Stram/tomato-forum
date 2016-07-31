import Marionette from 'backbone.marionette';
import $ from 'jquery';

import template from './template.hbs';
import loadingTemplate from 'templates/loading.hbs';

import session from 'session';

import Thread from 'models/thread';
import Comment from 'models/comment';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'page thread-page',

  ui: {
    newCommentButton: '.js-new-comment'
  },

  events: {
    'click @ui.newCommentButton': 'postNewComment'
  },

  template(data) {
    return false ? loadingTemplate : template(data);
  },

  initialize(args) {
    const self = this;
    this.loading = true;
    this.model = new Thread({id: args.threadId});

    this.model.fetch().then(() => {
      self.loading = false;
      self.render();
    });
  },

  postNewComment() {
    const self = this;

    const commentContent = $('.js-new-comment-content').val();
    const newComment = new Comment({
      content: commentContent,
      user: session.getCurrentUser().id,
      thread: this.model
    });

    newComment.save({}, {
      success(model, response) {
        const comments = self.thread.get('comments');
        comments.push(response);
      }
    });
  }
});
