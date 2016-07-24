import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from 'views/templates/components/modal-dialog.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'modal-dialog-container',

  events: {
    'click': 'onDismissClick',
    'click .js-modal-dialog-confirm-action': 'onConfirmClick',
    'click .js-modal-dialog-cancel-action': 'onCancelClick'
  },

  template,

  initialize(args) {
    this.title = args.title;
    this.content = args.content;

    this.confirmLabel = args.confirmLabel;
    this.confirmAction = args.confirmAction;

    this.cancelLabel = args.cancelLabel;
    this.cancelAction = args.cancelAction;
  },

  onConfirmClick() {
    this.confirmAction();
  },

  onCancelClick() {
    this.cancelAction();
  },

  onDismissClick(event) {
    if (event.target.classList.contains('modal-dialog-container')) {
      this.onCancelClick();
    }
  },

  render() {
    this.$el.html(
      _.template(
        this.template({
          title: this.title,
          content: this.content,
          confirmLabel: this.confirmLabel,
          cancelLabel: this.cancelLabel
        })
      )
    );

    $('body').append(this.$el);
    $('body').addClass('is-scrolling-disabled');

    return this;
  },

  close() {
    this.remove();
    $('body').removeClass('is-scrolling-disabled');
  }
});
