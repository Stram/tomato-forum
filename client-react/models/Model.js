import transportLayer from 'services/transport-layer';

export default class Model {
  constructor(options, urlEndpoint) {
    this.urlEndpoint = urlEndpoint;
    this.updateFromJson(options);
  }

  fetch() {
    const urlEndpoint = this.urlEndpoint;
    const id = this.id;
    return transportLayer.fetch({
      urlEndpoint: `${urlEndpoint}/${id}`
    }).then((user) => {
      this.updateFromJson(user);
    });
  }
}
