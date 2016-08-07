import Marionette from 'backbone.marionette';

import template from './template.hbs';

export default Marionette.View.extend({
  tagName: 'div',

  className: 'loading',

  template

});
