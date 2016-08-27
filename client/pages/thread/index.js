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
    submitNewComment: '.js-submit-new-comment',
    newCommentSection: '.js-new-comment-section'
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
    const fetchOptions = this.getFetchOptions();
    return this.collection.fetch(fetchOptions);
  },

  getFetchOptions() {
    return {
      data: { thread: this.threadId},
      reset: true
    };
  },

  showContent() {
    this.render();
    this.applicationChannel.trigger('loading:hide');

    this.showHeader();
    this.showComments();
    this.showPagination();
    this.updateNewCommentForm();
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
    const paginationView = this.paginationView = new PaginationView(this.collection);

    this.listenTo(paginationView, 'page:changed', (page) => {
      const fetchOptions = this.getFetchOptions();

      this.applicationChannel.trigger('loading:show');
      this.collection.getPage(page, fetchOptions).then(() => {
        paginationView.update(this.collection);
        this.updateNewCommentForm();
        this.applicationChannel.trigger('loading:hide');
      });
    });

    this.showChildView('pagination', paginationView);
  },

  createNewCommentForm() {
    const commentModel = new Comment({
      threadId: this.threadId
    });

    this.commentForm = new CommentForm({
      model: commentModel
    });
  },

  showNewCommentForm() {
    if (!this.commentForm) {
      this.createNewCommentForm();
      const formView = this.commentForm.getForm();
      this.showChildView('newComment', formView);
    }
    this.getUI('newCommentSection').removeClass(style.isHidden);
  },

  hideNewCommentForm() {
    this.getUI('newCommentSection').addClass(style.isHidden);
  },

  updateNewCommentForm() {
    const current = this.collection.state.currentPage;
    const total = this.collection.state.totalPages;
    if (current === total || total === 0) {
      this.showNewCommentForm();
    } else {
      this.hideNewCommentForm();
    }
  },

  submitNewComment() {
    const newCommentForm = this.commentForm.getForm();

    this.applicationChannel.trigger('loading:show');
    this.commentForm.submit().then(() => {
      newCommentForm.clear();
      this.fetchCollection().then(() => {
        this.paginationView.update(this.collection);
        this.updateNewCommentForm();
        this.applicationChannel.trigger('loading:hide');
      });
    });
  }
});
