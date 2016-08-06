import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import ApplicationView from 'pages/application/component';
import ModalView from 'components/modal-dialog/component';

const Application = Marionette.Application.extend({
  region: '#body',

  channelName: 'application',

  radioRequests: {
    'modal:show': 'showModal'
  },

  radioEvents: {
    'modal:hide': 'hideModal'
  },

  initialize() {
    this.applicationView = new ApplicationView();
    this.showView(this.applicationView, {replaceElement: true});
  },

  updateTheme(currentUser) {
    if (currentUser) {
      this.getView().updateTheme(currentUser.background);
    }
  },

  onStart() {
    Backbone.history.start({pushState: true});
  },

  getBaseView() {
    return this.getView();
  },

  showModal(options) {
    const modalOptions = options || {};
    const modalView = new ModalView(modalOptions);
    const applicationView = this.getView();

    applicationView.showChildView('modal', modalView);
    applicationView.$el.addClass('is-scrolling-disabled');

    return modalView;
  },

  hideModal() {
    const applicationView = this.getView();

    applicationView.$el.removeClass('is-scrolling-disabled');
    applicationView.getChildView('modal').destroy();
  }
});

export default new Application();
