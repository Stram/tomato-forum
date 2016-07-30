// import Handlebars from 'handlebars';
import Marionette from 'backbone.marionette';

import template from './template.hbs';

export default Marionette.View.extend({

  template,

  tagName: 'body',

  attributes: {
    id: 'body'
  },

  className: 'body',

  regions: {
    header: '#header',
    main: '#main',
    footer: '#footer'
  }

});
