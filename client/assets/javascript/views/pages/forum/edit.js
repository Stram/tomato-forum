import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/forum/edit.html';
import ModalDialog from 'views/components/modal-dialog';

import NewCategoryForm from 'forms/category';

import Category from 'models/category';
import categories from 'collections/categories';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page forum-edit-page',

  events: {
    'click .js-create-new-category': 'showNewCategoryModal'
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
    if (this.newCategoryFormObject) {
      this.newCategoryFormObject.close();
    }
    if (this.newCategoryModalDialog) {
      this.newCategoryModalDialog.close();
    }
  },

  showNewCategoryModal() {
    this.newCategoryFormObject = new NewCategoryForm({
      model: new Category({
        name: 'LALL'
      })
    });

    this.newCategoryForm = this.newCategoryFormObject.getForm();
    this.newCategoryForm.render();

    this.newCategoryForm.on('submit', this.closeNewCategoryModalDialog);

    this.newCategoryModalDialog = new ModalDialog({
      title: 'Create new category',
      content: this.newCategoryForm.el.innerHTML,
      cancelLabel: 'cancel',
      cancelAction: this.closeNewCategoryModalDialog.bind(this),
      confirmLabel: 'create',
      confirmAction: this.createNewCategory.bind(this)
    });

    this.newCategoryModalDialog.render();
  },

  closeNewCategoryModalDialog() {
    this.newCategoryForm.off();
    this.newCategoryModalDialog.close();
    this.newCategoryModalDialog = null;
  },

  createNewCategory() {
    this.newCategoryFormObject.submit();
    this.closeNewCategoryModalDialog();
  }
});
