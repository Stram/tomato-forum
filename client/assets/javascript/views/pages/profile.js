import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/profile.html';
import loadingTemplate from 'views/templates/loading.html';

import session from 'session';

import User from 'models/user';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page profile-page',

  events: {

  },

  template,
  loadingTemplate,

  initialize(args) {
    const self = this;
    this.loading = true;

    this.profile = new User({id: args.userId});
    this.profile.fetch().then(() => {
      self.loading = false;
      self.render();
    });

    this.isCurrentUser = this.profile.id === session.getCurrentUser().id;

    // this.listenTo(this.profile, 'change reset add remove', this.render);
  },


  render() {
    if (!this.loading) {
      this.$el.html(
        _.template(
          this.template({
            profile: this.profile,
            isCurrentUser: this.isCurrentUser
          })
        )
      );
    } else {
      this.$el.html(
        this.loadingTemplate()
      );
    }

    return this;
  },

  close() {
    this.remove();
  }
});
