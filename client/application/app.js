import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import ApplicationView from 'pages/application';
import ModalView from 'components/modal-dialog';
import LoadingView from 'components/loading';

const Application = Marionette.Application.extend({
  region: '#body',

  channelName: 'application',

  radioRequests: {
    'view:base:get': 'getBaseView'
  },

  radioEvents: {
    'modal:show': 'showModal',
    'modal:hide': 'hideModal',
    'loading:show': 'showLoading',
    'loading:hide': 'hideLoading',
    'overlay:show': 'showOverlay',
    'overlay:hide': 'hideOverlay'
  },

  initialize() {
    this.applicationView = new ApplicationView();
    this.listenTo(this.applicationView, 'overlayClicked', this.overlayClicked);
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
  },

  showOverlay() {
    this.getView().showOverlay();
  },

  hideOverlay() {
    this.getView().hideOverlay();
  },

  overlayClicked() {
    this.hideOverlay();
    const sidebarChannel = Radio.channel('sidebar');
    sidebarChannel.trigger('sidebar:hide');
  }
});

export default new Application();
