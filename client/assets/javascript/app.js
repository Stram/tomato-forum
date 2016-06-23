// import $ from 'jquery';
// import _ from 'underscore';
import Backbone from 'backbone';
import $ from 'jquery';

import '../stylesheet/app.scss';

import Router from 'router';

$(function() {
  new Router();
  Backbone.history.start();
});
