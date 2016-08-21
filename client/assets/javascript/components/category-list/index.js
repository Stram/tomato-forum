import Marionette from 'backbone.marionette';
import CategoryItemView from 'components/category-item';

export default Marionette.CollectionView.extend({
  childView: CategoryItemView
});
