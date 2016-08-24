import Backbone from 'backbone';
import _ from 'underscore';
import Dropzone from 'dropzone';

import template from 'views/templates/first-steps/photo.html';

import session from 'services/session';
import router from 'application/router';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page first-steps-photo-page',

  events: {
    'click .js-action-skip': 'skip',
    'click .js-action-upload-again': 'resetUpload',
    'click .js-action-next': 'submit'
  },

  template,

  render() {
    this.$el.html(
      _.template(
        this.template({
          currentUser: session.getCurrentUser()
        })
      )
    );

    this.initDropzone();

    return this;
  },

  close() {
    this.remove();
  },

  initDropzone() {
    const self = this;
    const $dropzoneDontainer = this.$('.dropzone-container');

    Dropzone.autoDiscover = false;

    this.dropzone = new Dropzone($dropzoneDontainer.get(0), {
      url: '/api/users/upload-photo',
      createImageThumbnails: false,
      previewTemplate: '<div></div>'
    });

    this.dropzone.on('success', (file, response) => {
      const photo = response.photo;
      self.$('.js-preview-image').css('background-image', `url('${photo.url}')`);

      self.$('.js-select-photo-container').addClass('has-photo');
      this.$('.js-action-skip').addClass('is-hidden');
      this.$('.js-action-upload-again').removeClass('is-hidden');
      this.$('.js-action-next').removeClass('is-hidden');
    });
  },

  skip() {
    router.navigate('dashboard', true);
  },

  resetUpload() {
    this.$('.js-select-photo-container').removeClass('has-photo');
    this.$('.js-action-skip').removeClass('is-hidden');
    this.$('.js-action-upload-again').addClass('is-hidden');
    this.$('.js-action-next').addClass('is-hidden');
  },

  submit() {
    router.navigate('dashboard', true);
  }
});
