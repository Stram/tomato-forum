import standardTransformation from '../helpers/standard-transformation';

export default function(doc, ret) {
  standardTransformation(doc, ret);
  return ret;
}
