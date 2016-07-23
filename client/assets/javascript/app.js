import Backbone from 'backbone';
import $ from 'jquery';
import session from 'session';

import 'router';
import 'trix';

import '../stylesheet/app.scss';

$(function() {
  session.initSession(() => {
    Backbone.history.start({pushState: true});
  });
});
