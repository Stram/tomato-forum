import transportLayer from 'services/transport-layer';

export default class User {
  constructor(options) {
    this.updateFromJson(options);
  }

  updateFromJson(json) {
    this.id = json.id;
    this.username = json.username;
    this.email = json.email;
  }

  fetch() {
    const id = this.id;
    return transportLayer.fetch({
      urlEndpoint: `/users/${id}`
    }).then((user) => {
      this.updateFromJson(user);
    });
  }
}
