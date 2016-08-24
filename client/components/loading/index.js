import Marionette from 'backbone.marionette';

import template from './template.hbs';
import style from './style.scss';

export default Marionette.View.extend({
  template,

  tagName: 'div',

  className: style.loading,

  templateContext: {
    style
  }

});
