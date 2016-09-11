import {observable, computed} from 'mobx';

import transportLayer from 'services/transport-layer';
import User from 'models/User';

class Session {
  @observable currentUser = null;

  @computed get isAuthenticated() {
    return !!this.currentUser;
  }

  constructor() {
    this.fetchCurrentUser();
  }

  fetchCurrentUser() {
    transportLayer.fetch({
      urlEndpoint: '/users/current'
    }).then((user) => {
      this.currentUser = new User(user);
    });
  }

  login(credentials) {
    transportLayer.fetch({
      urlEndpoint: '/users/login',
      method: 'POST',
      data: credentials
    }).then((user) => {
      this.currentUser = new User(user);
    });
  }
}

export default new Session();
