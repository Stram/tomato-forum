import Marionette from 'backbone.marionette';
import CategoryItemView from 'components/category-item/component';

export default Marionette.CollectionView.extend({
  childView: CategoryItemView
});
