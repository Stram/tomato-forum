import 'mocha';
import {expect} from 'chai';

import buildInsert from 'services/query-builder/builders/insert';

describe('insert builder', function() {
  it('should raise error if ther is no table property', function() {
    expect(buildInsert).to.throw(Error);
  });

  it('should generate correct INSERT command without properties', function() {
    const query = {
      table: 'table'
    }

    const expectedOutput = 'INSERT INTO table () VALUES ()';
    expect(buildInsert(query)).to.equal(expectedOutput);
  });

  it('should generate correct INSERT command with one property', function() {
    const values: Array<[string, any]> = [['id', 123]];
    const query = {
      table: 'table',
      values
    }

    const expectedOutput = 'INSERT INTO table (id) VALUES (123)';
    expect(buildInsert(query)).to.equal(expectedOutput);
  });

  it('should generate correct INSERT command with multiple properties', function() {
    const values: Array<[string, any]> = [['id', 123], ['name', 'Bob'], ['isValid', true]];
    const query = {
      table: 'table',
      values
    }

    const expectedOutput = 'INSERT INTO table (id, name, isValid) VALUES (123, "Bob", TRUE)';
    expect(buildInsert(query)).to.equal(expectedOutput);
  });
});
