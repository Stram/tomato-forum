import 'mocha';
import {expect} from 'chai';

import SelectBuilder from 'services/query-builder/builders/select';

describe('select builder', function() {
  it('should raise error if ther is no table property', function() {
    const builder = new SelectBuilder();
    expect(builder.build).to.throw(Error);
  });

  it('should generate correct SELECT command with only table property', function() {
    const builder = new SelectBuilder();
    builder.table('table');

    const expectedOutput = 'SELECT * FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with fields property', function() {
    const builder = new SelectBuilder();
    builder.table('table').fields(['id', 'name']);

    const expectedOutput = 'SELECT id, name FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with one field property', function() {
    const builder = new SelectBuilder();
    builder.table('table').fields('id');

    const expectedOutput = 'SELECT id FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with fields with association property', function() {
    const builder = new SelectBuilder();
    builder.table('table').fields(['id', ['name', 'fullname']]);

    const expectedOutput = 'SELECT id, name AS fullname FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with condition', function() {
    const builder = new SelectBuilder();
    builder.table('table').where('id', 5);

    const expectedOutput = 'SELECT * FROM table WHERE id=5';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions', function() {
    const builder = new SelectBuilder().table('table').where('id', 5).where('name', 'Bob');

    const expectedOutput = 'SELECT * FROM table WHERE id=5 AND name=\'Bob\'';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions and fields', function() {
    const builder = new SelectBuilder();
    builder.table('table').fields([['username', 'name'], 'email']).where('id', 5).where('name', 'Bob');

    const expectedOutput = 'SELECT username AS name, email FROM table WHERE id=5 AND name=\'Bob\'';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with limit and offset property', function() {
    const builder = new SelectBuilder();
    builder.table('table').where('id', 5).where('name', 'Bob').limit(10).offset(4);

    const expectedOutput = 'SELECT * FROM table WHERE id=5 AND name=\'Bob\' LIMIT 10 OFFSET 4';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with sort property', function() {
    const builder = new SelectBuilder();
    builder.table('table').where('id', 5).where('name', 'Bob').sortAsc('name');


    const expectedOutput = 'SELECT * FROM table WHERE id=5 AND name=\'Bob\' ORDER BY name ASC';
    expect(builder.build()).to.equal(expectedOutput);
  });
});
