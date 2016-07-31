import Marionette from 'backbone.marionette';

import template from './template.hbs';

export default Marionette.View.extend({
  template,

  tagName: 'div',

  className: 'card-list'
});
