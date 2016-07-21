import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/forum.html';
import ModalDialog from 'views/components/modal-dialog';

import categories from 'collections/categories';
import Thread from 'models/thread';

import router from 'router';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page forum-page',

  events: {
    'click .js-create-new-thread': 'showNewThreadModal',
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
    if (this.newThreadModalDialog) {
      this.newThreadModalDialog.close();
    }
  },

  showNewThreadModal(event) {
    this.newThreadModalDialog = new ModalDialog({
      title: 'Create new thread',
      content: '<div>LALALAL</div>',
      cancelLabel: 'cancel',
      cancelAction: this.closeNewThreadModalDialog.bind(this),
      confirmLabel: 'create',
      confirmAction: this.createNewThread.bind(this)
    });
    this.newThreadCategoryId = event.currentTarget.dataset.categoryId;

    this.newThreadModalDialog.render();
  },

  closeNewThreadModalDialog() {
    this.newThreadModalDialog.close();
    this.newThreadModalDialog = null;
  },

  createNewThread() {
    const newThread = new Thread({
      category: this.newThreadCategoryId
      // Add other params
    });

    newThread.save();

    this.closeNewThreadModalDialog();
  },

  transitionToEditForum() {
    // router.navigateTo('/')
  }
});
