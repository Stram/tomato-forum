import Marionette from 'backbone.marionette';
import ThreadItemView from 'components/thread-item';

export default Marionette.CollectionView.extend({
  childView: ThreadItemView
});
