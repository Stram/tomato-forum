import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import $ from 'jquery';

import template from './template.hbs';

import session from 'services/session';

import Comment from 'models/comment';

const applicationChannel = Radio.channel('application');

export default Marionette.View.extend({
  tagName: 'div',

  className: 'page thread-page',

  ui: {
    newCommentButton: '.js-new-comment'
  },

  events: {
    'click @ui.newCommentButton': 'postNewComment'
  },

  template,

  initialize(args) {
    const self = this;
    this.model = args.model;

    this.model.fetch().then(() => {
      applicationChannel.trigger('loading:hide');
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
