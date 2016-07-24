import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

import template from './template.html';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'modal-dialog-container',

  events: {
    click: 'onDismissClick',
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

    this.headerColor = args.headerColor;
  },

  onConfirmClick() {
    this.confirmAction();
  },

  onCancelClick() {
    this.cancelAction();
  },

  onDismissClick(event) {
    if ($(event.target).hasClass('modal-dialog-container')) {
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
          cancelLabel: this.cancelLabel,
          headerColor: this.headerColor
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
