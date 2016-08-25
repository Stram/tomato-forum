import Marionette from 'backbone.marionette';
import CommentItemView from 'components/comment-item';

export default Marionette.CollectionView.extend({
  childView: CommentItemView
});
