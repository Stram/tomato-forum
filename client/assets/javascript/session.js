import $ from 'jquery';
import config from 'config';

import router from 'router';

export default {
  _currentUser: null,

  setCurrentUser(user) {
    this._currentUser = user;
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
        url: `${config.apiEndpoint}/user/login`,
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
      url: `${config.apiEndpoint}/user/logout`,
      method: 'POST'
    }).done(() => {
      self.setCurrentUser(null);
      router.navigate('login', true);
    });
  },

  initSession(callback) {
    const self = this;
    $.ajax({
      url: `${config.apiEndpoint}/user/current`
    }).done((response) => {
      const currentUser = response.user;
      self._currentUser = currentUser;

      callback.apply(self);
    });
  }
};
