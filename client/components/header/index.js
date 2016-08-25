import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

import template from './template.hbs';
import style from './style.scss';

export default Marionette.View.extend({
  tagName: 'div',

  className: style.header,

  template,

  ui: {
    sidebarMenuIcon: '.js-menu'
  },

  events: {
    'click @ui.sidebarMenuIcon': 'openSidebar'
  },

  templateContext() {
    return {
      style,
      title: this.title
    };
  },

  initialize(options) {
    this.title = options.title;
    this.sidebarChannel = Radio.channel('sidebar');
  },

  openSidebar() {
    this.sidebarChannel.trigger('sidebar:show');
  }
});
