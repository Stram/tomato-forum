import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

import template from './template.hbs';
import ModalDialog from 'components/modal-dialog/component';
import NewThreadForm from 'forms/thread';

import categories from 'collections/categories';

import Thread from 'models/thread';

// import router from 'router/main';

export default Marionette.View.extend({
  tagName: 'article',

  className: 'page forum-page',

  template,

  templateContext: {
    categories
  },

  initialize() {
    categories.fetch();
  },

});

// export default Backbone.View.extend({
//
//   events: {
//     'click .js-create-new-thread': 'showNewThreadModal',
//     'click .js-forum-edit': 'transitionToEditForum'
//   },
//
//   initialize() {
//     categories.fetch();
//     this.listenTo(categories, 'change reset add remove', this.render);
//   },
//
//   render() {
//     this.$el.html(
//
//       _.template(
//         this.template({
//           categories
//         })
//       )
//     );
//
//     return this;
//   },
//
//   close() {
//     this.remove();
//
//     if (this.newThreadModalDialog) {
//       this.newThreadModalDialog.close();
//     }
//
//     if (this.newThreadFormObject) {
//       this.newThreadFormObject.close();
//     }
//   },
//
//   showNewThreadModal(event) {
//     this.newThreadFormObject = new NewThreadForm({
//       model: new Thread({
//         categoryId: event.currentTarget.dataset.categoryId
//       })
//     });
//
//     this.newThreadForm = this.newThreadFormObject.getForm();
//     this.newThreadForm.render();
//
//     this.newThreadForm.on('submit', this.closeNewThreadModalDialog);
//
//     this.newThreadModalDialog = new ModalDialog({
//       title: 'Create new thread',
//       content: this.newThreadForm.el.outerHTML,
//       cancelLabel: 'cancel',
//       cancelAction: this.closeNewThreadModalDialog.bind(this),
//       confirmLabel: 'create',
//       confirmAction: this.createNewThread.bind(this)
//     });
//
//     this.newThreadModalDialog.render();
//   },
//
//   closeNewThreadModalDialog() {
//     this.newThreadForm.off();
//     this.newThreadModalDialog.close();
//     this.newThreadModalDialog = null;
//   },
//
//   createNewThread() {
//     this.newThreadFormObject.submit();
//     this.closeNewThreadModalDialog();
//   },
//
//   transitionToEditForum() {
//     router.navigate('forum/edit', true);
//   }
// });
