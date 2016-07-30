import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import ApplicationView from 'pages/application/component';

const Application = Marionette.Application.extend({
  region: '#body',

  initialize() {
    this.applicationView = new ApplicationView();
    this.showView(this.applicationView, {replaceElement: true});
  },

  updateTheme(currentUser) {
    if (currentUser) {
      this.applicationView.updateTheme(currentUser.background);
    }
  },

  onStart() {
    Backbone.history.start({pushState: true});
  },

  getBaseView() {
    return this.applicationView;
  }
});

export default new Application();
