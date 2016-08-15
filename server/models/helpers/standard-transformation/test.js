import { describe, it } from 'mocha';
import { expect } from 'chai';
import _ from 'lodash';

import standardTransformation from './index';

describe('Model helpers - standard transformation', () => {
  it('should transform given object', () => {
    const object = {
      _id: 2345,
      __v: 234234,
      property: 'treba ostati'
    };

    const object2 = _.cloneDeep(object);

    standardTransformation(object, object2);

    expect(object).to.have.property('_id');
    expect(object).to.not.have.property('id');
    expect(object).to.have.property('__v');
    expect(object).to.have.property('property');

    expect(object2).to.not.have.property('_id');
    expect(object2).to.have.property('id');
    expect(object2).to.not.have.property('__v');
    expect(object2).to.have.property('property');
  });
});
