import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import style from './style.scss';
import buttonStyle from 'styles/partials/button.scss';

import Comment from 'models/comment';

import HeaderView from 'components/header';
import CommentsView from 'components/comment-list';
import PaginationView from 'components/pagination';

import CommentForm from 'forms/comment';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'page thread-page',

  template,

  regions: {
    header: '.js-header',
    comments: '#thread-comments',
    pagination: '.js-pagination',
    newComment: '#new-comment'
  },

  ui: {
    submitNewComment: '.js-submit-new-comment'
  },

  events: {
    'click @ui.submitNewComment': 'submitNewComment'
  },

  templateContext() {
    const owner = this.model.get('owner') ? this.model.get('owner').toJSON() : {};
    return {
      buttonStyle,
      style,
      owner
    };
  },

  initialize({threadId}) {
    this.threadId = threadId;
    this.applicationChannel = Radio.channel('application');

    const fetchModel = this.model.fetch({reset: true});
    const fetchCollection = this.fetchCollection();

    Promise.all([fetchModel, fetchCollection]).then(() => {
      this.showContent();
    });
  },

  fetchCollection() {
    return this.collection.fetch({
      data: { thread: this.threadId},
      reset: true
    });
  },

  showContent() {
    this.render();
    this.applicationChannel.trigger('loading:hide');

    this.showHeader();
    this.showComments();
    this.showPagination();

    if (this.collection.currentPage === this.collection.totalPages) {
      const commentModel = new Comment({
        threadId: this.threadId
      });

      this.commentForm = new CommentForm({
        model: commentModel
      });

      const formView = this.commentForm.getForm();
      this.showChildView('newComment', formView);
    }
  },

  showHeader() {
    const headerView = new HeaderView({
      title: this.model.get('title')
    });

    this.showChildView('header', headerView, {replaceElement: true});
  },

  showComments() {
    const commentsView = new CommentsView({
      collection: this.collection
    });

    this.showChildView('comments', commentsView);
  },

  showPagination() {
    const paginationView = new PaginationView({
      current: this.collection.state.currentPage,
      total: this.collection.state.totalPages
    });

    this.listenTo(paginationView, 'page:changed', (page) => {
      this.applicationChannel.trigger('loading:show');
      this.collection.getPage(page).then(() => {
        paginationView.changePage(page);
        this.applicationChannel.trigger('loading:hide');
      });
    });

    this.showChildView('pagination', paginationView);
  },

  submitNewComment() {
    const newCommentForm = this.commentForm.getForm();
    this.commentForm.submit().then(() => {
      newCommentForm.clear();
      this.fetchCollection();
    });
  }
});
