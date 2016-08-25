import Marionette from 'backbone.marionette';
import _ from 'underscore';

import template from './template.hbs';
import style from './style.scss';

export default Marionette.View.extend({
  template,

  tagName: 'div',

  className: style.pagination,

  events: {
    'click .js-pagination-item': 'itemClicked'
  },

  templateContext() {
    return {
      style,
      paginationItems: this.paginationItems
    };
  },

  initialize(options) {
    this.currentPage = options.current;
    this.totalPages = options.total;

    this.paginationItems = this.calculatePages();
  },

  calculatePages() {
    const isClose = (num) => {
      return Math.abs(num - this.currentPage) < 3;
    };

    const getClassName = (num) => {
      const isFirst = num === 1 && !isClose(num);
      const isLast = num === this.totalPages && !isClose(num);
      const isCurrent = num === this.currentPage;

      if (isFirst) {
        return style.first;
      } else if (isLast) {
        return style.last;
      } else if (isCurrent) {
        return style.current;
      }

      return '';
    };

    const numbers = _.range(1, this.totalPages + 1).filter((num) => {
      return num === 1 || num === this.totalPages || isClose(num);
    }).map((num) => {
      return {
        label: num,
        className: getClassName(num)
      };
    });

    return numbers;
  },

  itemClicked() {
    this.trigger('page:changed', 2);
  }

});
