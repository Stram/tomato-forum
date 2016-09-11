import Model from 'models/Model';

import Photo from 'models/Photo';

export default class User extends Model {
  constructor(options) {
    super(options, '/users');
  }

  updateFromJson(json) {
    const user = json.user || {};
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
    this.profilePhotot = user.profilePhoto ? new Photo(user.profilePhoto) : undefined;
  }
}
