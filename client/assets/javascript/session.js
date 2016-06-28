import $ from 'jquery';
import config from 'config';

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

  initSession(callback) {
    const self = this;
    $.ajax({
      url: `${config.apiEndpoint}/user/current`
    }).done((response) => {
      const currentUser = response.user;
      self._currentUser = currentUser;

      callback.apply(self);

      console.log(currentUser);
    });
  }
};
