import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import router from 'application/router';

import template from './template.hbs';
import cardListStyle from 'styles/partials/card-list.scss';

import NewThreadForm from 'forms/thread';
import Thread from 'models/thread';
import ThreadListView from 'components/thread-list';

const applicationChannel = Radio.channel('application');

export default Marionette.View.extend({
  template,

  tagName: 'div',

  className: cardListStyle.cardList,

  ui: {
    createNewThreadButton: '.js-create-new-thread'
  },

  regions: {
    threads: '.js-category-threads'
  },

  events: {
    'click @ui.createNewThreadButton': 'showNewThreadModal'
  },

  templateContext() {
    return {
      cardList: cardListStyle
    };
  },

  initialize(collection) {
    this.model = collection.model;
  },

  onBeforeAttach() {
    this.showChildView('threads', new ThreadListView({
      collection: this.model.get('threads'),
      filter(child, index) {
        return index < 5;
      }
    }));
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

    applicationChannel.trigger('modal:show', modalOptions);
  },

  closeNewThreadModalDialog() {
    applicationChannel.trigger('modal:hide');
  },

  createNewThread() {
    this.newThreadFormObject.submit().then((thread) => {
      this.closeNewThreadModalDialog();
      const id = thread.id;
      router.navigate(`/thread/${id}`);
    });
  }
});
