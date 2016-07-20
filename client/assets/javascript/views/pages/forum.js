import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from 'views/templates/forum.html';

import categories from 'collections/categories';
// import Thread from 'models/thread';

import config from 'config';
import router from 'router';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page forum-page',

  events: {
    'click .js-new-thread-button': 'showNewThreadModal',
    'click .js-new-thread-cancel': 'hideNewThreadModal',
    'click .js-new-thread-submit': 'postNewThread',
    'click .js-navigate-to-thread': 'openThread',
    'click .js-forum-edit': 'transitionToEditForum'
  },

  template,

  initialize() {
    categories.fetch();
    this.listenTo(categories, 'change reset add remove', this.render);
  },

  render() {
    this.$el.html(
      _.template(
        this.template({
          categories
        })
      )
    );

    return this;
  },

  close() {
    this.remove();
  },

  showNewThreadModal() {
    this.$('.js-new-thread-modal').addClass('is-shown');
    $('body').addClass('is-scrolling-disabled');
  },

  hideNewThreadModal() {
    this.$('.js-new-thread-modal').removeClass('is-shown');
    $('body').removeClass('is-scrolling-disabled');
  },

  postNewThread() {
    const self = this;
    const title = this.$('.js-new-thread-title').val();
    const content = this.$('.js-new-thread-content').val();

    $.ajax({
      url: `${config.apiEndpoint}/thread`,
      method: 'POST',
      data: {
        title,
        content
      }
    }).done((response) => {
      self.hideNewThreadModal();
      // Forum.add(new Thread(response.thread));
    });
  },

  openThread(event) {
    const threadId = event.target.dataset.threadId;
    router.navigate(`thread/${threadId}`, true);
  },

  transitionToEditForum() {
    router.navigate('forum/edit', true);
  }
});
