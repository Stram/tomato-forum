import Backbone from 'backbone';
import _ from 'underscore';
import $ from 'jquery';

// templates
import template from 'views/templates/partials/new-thread-form.html';

// models
import Thread from 'models/thread';

export default Backbone.View.extend({

  initialize(args) {
    this.categoryId = args.categoryId;
  },

  events: {
    'submit .js-new-thread-form': 'formSubmit'
  },

  template,

  render() {
    this.$el.html(
      _.template(
        this.template()
      )
    );

    return this;
  },

  close() {
    this.remove();
  },

  formSubmit(event) {
    event.preventDefault();
    this.trigger('submit');
    this.submit();
  },

  getUserData() {
    const title = $('.js-new-thread-title').val();
    const content = $('.js-new-thread-content').val();
    const categoryId = this.categoryId;

    return {title, content, categoryId};
  },

  submit() {
    const userData = this.getUserData();
    const newThread = new Thread(userData);

    newThread.save();
  }
});
