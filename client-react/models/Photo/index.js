import Model from 'models/Model';

export default class Photo extends Model {
  constructor(options) {
    super(options, '/photos');
  }

  updateFromJson(json) {
    this.id = json.id;
    this.url = json.url;
    this.name = json.name;
  }
}
