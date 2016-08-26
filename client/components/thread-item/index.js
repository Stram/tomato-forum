import Marionette from 'backbone.marionette';
import router from 'application/router';

import template from './template.hbs';
import style from './style.scss';

export default Marionette.View.extend({
  template,

  tagName: 'div',

  className: style.threadItem,

  events: {
    'click a': 'navigate'
  },

  templateContext() {
    return {
      style,
      owner: this.model.get('owner').toJSON()
    };
  },

  navigate(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    router.navigate(href, true);
  }
});
