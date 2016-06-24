import Backbone from 'backbone';
import $ from 'jquery';
import router from 'router';

import '../stylesheet/app.scss';

$(function() {
  Backbone.history.start({pushState: true});
});
