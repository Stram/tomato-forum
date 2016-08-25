import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import style from './style.scss';

import CategoriesView from 'components/category-list';

import categories from 'collections/categories';


export default Marionette.View.extend({
  tagName: 'article',

  className: 'page forum-page',

  template,

  regions: {
    forumCategories: '#forum-categories'
  },

  ui: {
    sidebarMenuIcon: '.js-menu',
    toForumEdit: '.js-forum-edit'
  },

  events: {
    'click @ui.toForumEdit': 'transitionToEditForum',
    'click @ui.sidebarMenuIcon': 'openSidebar'
  },

  templateContext: {
    style
  },

  initialize() {
    this.applicationChannel = Radio.channel('application');
    this.sidebarChannel = Radio.channel('sidebar');

    categories.fetch().then(() => {
      this.applicationChannel.trigger('loading:hide');
    });
  },

  onBeforeAttach() {
    this.showChildView('forumCategories', new CategoriesView({
      collection: categories
    }));
  },

  transitionToEditForum() {
    // router.navigate('forum/edit', true);
  },

  openSidebar() {
    this.sidebarChannel.trigger('sidebar:show');
  }
});
