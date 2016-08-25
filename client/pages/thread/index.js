import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import style from './style.scss';

import HeaderView from 'components/header';
import CommentsView from 'components/comment-list';
import PaginationView from 'components/pagination';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'page thread-page',

  template,

  regions: {
    header: '.js-header',
    comments: '#thread-comments',
    pagination: '.js-pagination'
  },

  templateContext() {
    const owner = this.model.get('owner') ? this.model.get('owner').toJSON() : {};
    return {
      style,
      owner
    };
  },

  initialize({threadId}) {
    this.applicationChannel = Radio.channel('application');

    const fetchModel = this.model.fetch();
    const fetchCollection = this.collection.fetch({
      data: { thread: threadId}
    });

    Promise.all([fetchModel, fetchCollection]).then(() => {
      this.showContent();
    });
  },

  showContent() {
    this.render();
    this.applicationChannel.trigger('loading:hide');

    const headerView = new HeaderView({
      title: this.model.get('title')
    });

    this.showChildView('header', headerView, {replaceElement: true});

    const commentsView = new CommentsView({
      collection: this.collection
    });

    this.showChildView('comments', commentsView);

    const paginationView = new PaginationView({
      current: this.collection.state.currentPage,
      total: this.collection.state.totalPages
    });

    this.listenTo(paginationView, 'page:changed', (page) => {
      this.collection.getPage(page);
    });

    this.showChildView('pagination', paginationView);
  }
});
