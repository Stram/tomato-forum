import Backbone from 'backbone';
import _ from 'underscore';

import template from 'views/templates/dashboard.html';

import session from 'session';

export default Backbone.View.extend({
  tagName: 'div',

  className: 'page dashboard-page',

  events: {

  },

  template,


  render() {
    // console.log('AAADAA');
    // console.log(session.getCurrentUser());
    // console.log(session.getCurrentUser().get('username'));
    
    this.$el.html(
      _.template(
        this.template({
          currentUser: session.getCurrentUser()
        })
      )
    );

    return this;
  },

  close() {
    this.remove();
  }
});
