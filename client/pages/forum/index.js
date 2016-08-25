import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import style from './style.scss';

import categories from 'collections/categories';

import CategoriesView from 'components/category-list';
import HeaderView from 'components/header';

export default Marionette.View.extend({
  tagName: 'article',

  className: 'page forum-page',

  template,

  regions: {
    forumCategories: '#forum-categories',
    header: '.js-header'
  },

  ui: {
    toForumEdit: '.js-forum-edit'
  },

  events: {
    'click @ui.toForumEdit': 'transitionToEditForum'
  },

  templateContext: {
    style
  },

  initialize() {
    this.applicationChannel = Radio.channel('application');

    categories.fetch().then(() => {
      this.showCategories();
    });
  },

  showCategories() {
    this.applicationChannel.trigger('loading:hide');

    this.showChildView('header', new HeaderView({
      title: 'Forum'
    }), {replaceElement: true});

    this.showChildView('forumCategories', new CategoriesView({
      collection: categories
    }));
  },

  transitionToEditForum() {
    // router.navigate('forum/edit', true);
  }
});
