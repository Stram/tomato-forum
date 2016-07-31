import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import NewThreadForm from 'forms/thread';

import Thread from 'models/thread';

const applicationChannel = Radio.channel('application');

export default Marionette.View.extend({
  template,

  tagName: 'div',

  className: 'card-list',

  ui: {
    createNewThreadButton: '.js-create-new-thread'
  },

  events: {
    'click @ui.createNewThreadButton': 'showNewThreadModal'
  },

  showNewThreadModal(event) {
    this.newThreadFormObject = new NewThreadForm({
      model: new Thread({
        categoryId: event.currentTarget.dataset.categoryId
      })
    });

    this.newThreadForm = this.newThreadFormObject.getForm();

    const modalOptions = {
      title: 'Create new thread',
      contentView: this.newThreadForm,
      cancelLabel: 'cancel',
      cancelAction: this.closeNewThreadModalDialog.bind(this),
      confirmLabel: 'create',
      confirmAction: this.createNewThread.bind(this)
    };

    const modalView = applicationChannel.request('modal:show', modalOptions);

    // this.newThreadForm.on('submit', this.closeNewThreadModalDialog);
  },

  closeNewThreadModalDialog() {
    // this.newThreadForm.off();
    applicationChannel.trigger('modal:hide');
  },

  createNewThread() {
    // this.newThreadFormObject.submit();
    this.closeNewThreadModalDialog();
  }
});
