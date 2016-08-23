import Marionette from 'backbone.marionette';
import $ from 'jquery';

import template from './template.hbs';
import style from './style.scss';
import buttonStyle from 'styles/partials/button.scss';

export default Marionette.View.extend({
  tagName: 'div',

  className: style.modalDialogContainer,

  template,

  ui: {
    confirm: '.js-modal-dialog-confirm-action',
    cancel: '.js-modal-dialog-cancel-action'
  },

  events: {
    click: 'onDismissClick',
    'click @ui.confirm': 'onConfirmClick',
    'click @ui.cancel': 'onCancelClick'
  },

  regions: {
    content: '.js-modal-content'
  },

  initialize(args) {
    this.title = args.title;
    this.contentView = args.contentView;

    this.confirmLabel = args.confirmLabel;
    this.confirmAction = args.confirmAction;

    this.cancelLabel = args.cancelLabel;
    this.cancelAction = args.cancelAction;

    this.headerColor = args.headerColor;

    if (!this.contentView) {
      throw new Error('contentView must be defined!');
    }
  },

  templateContext() {
    return {
      style,
      buttonStyle,
      title: this.title,
      confirmLabel: this.confirmLabel,
      cancelLabel: this.cancelLabel,
      headerColor: this.headerColor
    };
  },

  onBeforeAttach() {
    this.showChildView('content', this.contentView);
  },

  onConfirmClick() {
    if (this.confirmAction) {
      this.confirmAction();
    } else {
      this.trigger('confirm');
    }
  },

  onCancelClick() {
    if (this.cancelAction) {
      this.cancelAction();
    } else {
      this.trigger('cancel');
    }
  },

  onDismissClick(event) {
    if ($(event.target).hasClass('modal-dialog-container')) {
      this.onCancelClick();
    }
  }
});
