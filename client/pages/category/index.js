import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import style from './style.scss';

import ThreadsView from 'components/thread-list';
import PaginationView from 'components/pagination';

export default Marionette.View.extend({
  tagName: 'article',

  template,

  regions: {
    categoryThreads: '#category-threads',
    pagination: '.js-pagination'
  },

  ui: {
    sidebarMenuIcon: '.js-menu'
  },

  events: {
    'click @ui.sidebarMenuIcon': 'openSidebar'
  },

  templateContext() {
    return {
      style,
      category: this.model
    };
  },

  initialize({categoryId}) {
    this.applicationChannel = Radio.channel('application');
    this.sidebarChannel = Radio.channel('sidebar');

    const fetchModel = this.model.fetch();
    const fetchCollection = this.collection.fetch({
      data: { category: categoryId}
    });

    Promise.all([fetchModel, fetchCollection]).then(() => {
      this.showThreads();
    });
  },

  showThreads() {
    this.applicationChannel.trigger('loading:hide');

    this.showChildView('categoryThreads', new ThreadsView({
      collection: this.collection
    }));

    const paginationView = new PaginationView({
      current: this.collection.state.currentPage,
      total: this.collection.state.totalPages
    });

    this.listenTo(paginationView, 'page:changed', (page) => {
      this.collection.getPage(page);
    });

    this.showChildView('pagination', paginationView);
  },

  openSidebar() {
    this.sidebarChannel.trigger('sidebar:show');
  }
});
