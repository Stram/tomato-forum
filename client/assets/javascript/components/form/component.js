import Backbone from 'backbone';
import _ from 'underscore';

export default Backbone.View.extend({
  tagName: 'form',

  className: '',

  events: {
    'click .js-form': 'onSubmit'
  },

  initialize(args) {
    this.propertyViews = args.propertyViews;
  },

  render() {
    _.each(this.propertyViews, (view) => {
      view.render();
      this.$el.append(view.$el);
    });

    return this;
  },

  close() {
    this.remove();
  },

  onSubmit(event) {
    event.preventDefault();
    this.trigger('submit');
  }
});
