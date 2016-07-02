import Backbone from 'backbone';
import Thread from 'models/thread';

export default Backbone.Collection.extend({
  model: Thread
});
