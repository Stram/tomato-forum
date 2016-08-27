import Radio from 'backbone.radio';
import $ from 'jquery';
import config from 'config';

const sessionChannel = Radio.channel('session');

const session = {
  _currentUser: null,

  setCurrentUser(user) {
    this._currentUser = user;
    // app.updateTheme(user);
  },

  getCurrentUser() {
    return this._currentUser;
  },

  isAuthenticated() {
    return !!this._currentUser;
  },

  login(identification, password) {
    const self = this;
    return new Promise((resolve, reject) => {
      $.ajax({
        url: `${config.apiEndpoint}/users/login`,
        method: 'POST',
        data: {
          identification,
          password
        }
      }).done((response) => {
        self.setCurrentUser(response.user);
        resolve(response.user);
      }).fail((jqXHR) => {
        if (jqXHR.status >= 400) {
          const errors = jqXHR.responseJSON.errors;
          reject(errors);
        }
      });
    });
  },

  logout() {
    const self = this;

    $.ajax({
      url: `${config.apiEndpoint}/users/logout`,
      method: 'POST'
    }).done(() => {
      self.setCurrentUser(null);
      // router.navigate('login', true);
    });
  },

  initSession() {
    return new Promise((resolve, reject) => {
      const self = this;
      $.ajax({
        url: `${config.apiEndpoint}/users/current`
      }).done((response) => {
        self.setCurrentUser(response.user);
        resolve(response);
      }).fail((error) => {
        reject(error);
      });
    });
  }
};

sessionChannel.reply('user:authenticated', session.isAuthenticated.bind(session));

export default session;
