import backbone from 'backbone';

export default backbone.View.extend({
  tagName: 'div',

  className: 'page register-page',

  events: {
    'click .icon':          'open',
    'click .button.edit':   'openEditDialog',
    'click .button.delete': 'destroy'
  },

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
  },

  render: function() {

  }

});
