import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import ApplicationView from 'pages/application/component';
import ModalView from 'components/modal-dialog/component';
import LoadingView from 'components/loading/component';

const Application = Marionette.Application.extend({
  region: '#body',

  channelName: 'application',

  radioEvents: {
    'modal:show': 'showModal',
    'modal:hide': 'hideModal',
    'loading:show': 'showLoading',
    'loading:hide': 'hideLoading'
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

  showSubView(options = {}) {
    const applicationView = this.getView();

    applicationView.showChildView(options.region, options.view);
    if (options.disableScroll) {
      applicationView.$el.addClass('is-scrolling-disabled');
    }
  },

  hideSubView(options = {}) {
    const applicationView = this.getView();

    applicationView.$el.removeClass('is-scrolling-disabled');
    applicationView.getChildView(options.region).destroy();
  },

  showModal(options) {
    const modalOptions = options || {};
    const modalView = new ModalView(modalOptions);

    this.showSubView({
      region: 'modal',
      view: modalView,
      disableScroll: true
    });
  },

  hideModal() {
    this.hideSubView({
      region: 'modal'
    });
  },

  showLoading() {
    const loadingView = new LoadingView();

    this.showSubView({
      region: 'loading',
      view: loadingView,
      disableScroll: true
    });

  },

  hideLoading() {
    this.hideSubView({
      region: 'loading'
    });
  }
});

export default new Application();
