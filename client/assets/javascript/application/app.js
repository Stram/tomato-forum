import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import ApplicationView from 'pages/application/component';

import {startRouter} from 'router/main';

const Application = Marionette.Application.extend({
  region: '#body',

  onStart() {
    this.applicationView = new ApplicationView();
    this.showView(this.applicationView, {replaceElement: true});

    startRouter();
    
    Backbone.history.start({pushState: true});
  },

  getBaseView() {
    return this.applicationView;
  }
});

export default new Application();
