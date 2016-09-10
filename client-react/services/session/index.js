import {observable, computed} from 'mobx';

import transportLayer from 'services/transport-layer';
import User from 'models/user';

class Session {
  @observable currentUser = null;

  @computed get isAuthenticated() {
    return !!this.currentUser;
  }

  constructor() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    transportLayer.fetch({
      urlEndpoint: '/users/current'
    }).then((user) => {
      this.currentUser = new User(user);
    });
  }
}

export default new Session();
