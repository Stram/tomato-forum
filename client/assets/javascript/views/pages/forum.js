import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/forum.html';
import ModalDialog from 'views/components/modal-dialog';
import NewThreadForm from 'views/components/forms/new-thread-form.js';

import categories from 'collections/categories';

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

    if (this.newThreadForm) {
      this.newThreadForm.close();
    }
  },

  showNewThreadModal(event) {
    this.newThreadForm = new NewThreadForm({
      categoryId: event.currentTarget.dataset.categoryId
    });

    this.newThreadForm.render();

    this.newThreadForm.on('submit', this.closeNewThreadModalDialog);

    this.newThreadModalDialog = new ModalDialog({
      title: 'Create new thread',
      content: this.newThreadForm.el.innerHTML,
      cancelLabel: 'cancel',
      cancelAction: this.closeNewThreadModalDialog.bind(this),
      confirmLabel: 'create',
      confirmAction: this.createNewThread.bind(this)
    });

    this.newThreadModalDialog.render();
  },

  closeNewThreadModalDialog() {
    this.newThreadForm.off();
    this.newThreadModalDialog.close();
    this.newThreadModalDialog = null;
  },

  createNewThread() {
    this.newThreadForm.submit();
    this.closeNewThreadModalDialog();
  },

  transitionToEditForum() {
    router.navigate('forum/edit', true);
  }
});
