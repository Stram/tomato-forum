import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import router from 'router/main';

import template from './template.hbs';
import CategoriesView from 'collection-views/categories/component';

import categories from 'collections/categories';

const applicationChannel = Radio.channel('application');

export default Marionette.View.extend({
  tagName: 'article',

  className: 'page forum-page',

  template,

  regions: {
    forumCategories: '#forum-categories'
  },

  ui: {
    toForumEdit: '.js-forum-edit'
  },

  events: {
    'click @ui.toForumEdit': 'transitionToEditForum'
  },

  initialize() {
    categories.fetch().then(() => {
      applicationChannel.trigger('loading:hide');
    });
  },

  onBeforeAttach() {
    this.showChildView('forumCategories', new CategoriesView({
      collection: categories
    }));
  },

  transitionToEditForum() {
    router.navigate('forum/edit', true);
  }
});
