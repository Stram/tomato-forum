import 'mocha';
import {expect} from 'chai';

import buildSelect from 'services/query-builder/builders/select';

describe('select builder', function() {
  it('should raise error if ther is no table property', function() {
    expect(buildSelect).to.throw(Error);
  });

  it('should generate correct SELECT command with only table property', function() {
    const query = {
      table: 'table',
      fields: [],
      conditions: [],
      sort: []
    }

    const expectedOutput = 'SELECT * FROM table';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with fields property', function() {
    const query = {
      table: 'table',
      fields: ['id', 'name'],
      conditions: [],
      sort: []
    }

    const expectedOutput = 'SELECT id, name FROM table';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with fields with association property', function() {
    const query = {
      table: 'table',
      fields: ['id', 'name AS fullname'],
      conditions: [],
      sort: []
    }

    const expectedOutput = 'SELECT id, name AS fullname FROM table';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with condition', function() {
    const query = {
      table: 'table',
      fields: [],
      conditions: ['id=5'],
      sort: []
    }

    const expectedOutput = 'SELECT * FROM table WHERE id=5';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions', function() {
    const query = {
      table: 'table',
      fields: [],
      conditions: ['id=5', 'name="Bob"'],
      sort: []
    }

    const expectedOutput = 'SELECT * FROM table WHERE id=5 AND name="Bob"';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions and fields', function() {
    const query = {
      table: 'table',
      fields: ['username AS name', 'email'],
      conditions: ['id=5', 'name="Bob"'],
      sort: []
    }

    const expectedOutput = 'SELECT username AS name, email FROM table WHERE id=5 AND name="Bob"';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with limit and offset property', function() {
    const query = {
      table: 'table',
      fields: [],
      conditions: ['id=5', 'name="Bob"'],
      sort: [],
      limit: 10,
      offset: 4
    }

    const expectedOutput = 'SELECT * FROM table WHERE id=5 AND name="Bob" LIMIT 10 OFFSET 4';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with sort property', function() {
    const query = {
      table: 'table',
      fields: [],
      conditions: ['id=5', 'name="Bob"'],
      sort: ['name ASC']
    }

    const expectedOutput = 'SELECT * FROM table WHERE id=5 AND name="Bob" ORDER BY name ASC';
    expect(buildSelect(query)).to.equal(expectedOutput);
  });
});
