import Marionette from 'backbone.marionette';

import template from './template.hbs';
import style from './style.scss';

import SidebarView from 'components/sidebar';

export default Marionette.View.extend({

  template,

  tagName: 'body',

  attributes: {
    id: 'body'
  },

  ui: {
    overlay: '#overlay'
  },

  events: {
    'click @ui.overlay': 'overlayClicked'
  },

  className: `${style.body} theme theme-0`,

  regions: {
    sidebar: {
      el: '#sidebar',
      replaceElement: true
    },
    main: '#main',
    modal: '#modal',
    loading: '#loading'
  },

  templateContext: {
    style
  },

  addSidebar() {
    const sidebarRegion = this.getRegion('sidebar');
    if (!sidebarRegion.hasView()) {
      this.showChildView('sidebar', new SidebarView());
    }
  },

  removeSidebar() {
    const sidebarRegion = this.getRegion('sidebar');
    sidebarRegion.empty();
  },

  showOverlay() {
    this.getUI('overlay').addClass(style.isShown);
  },

  hideOverlay() {
    this.getUI('overlay').removeClass(style.isShown);
  },

  overlayClicked() {
    this.trigger('overlayClicked');
  },

  updateTheme(theme) {
    this.$el.addClass(`theme-${theme}`);
  }

});
