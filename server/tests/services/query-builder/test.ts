import 'mocha';
import {expect} from 'chai';

import QueryBuilder from 'services/query-builder';

describe('query builder service', function() {
  it('should generate correct SELECT command with only table property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table');

    const expectedOutput = 'SELECT * FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with fields property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').field('id').field('name');

    const expectedOutput = 'SELECT id, name FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with fields with association property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').field('id').field('name AS fullname');

    const expectedOutput = 'SELECT id, name AS fullname FROM table';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with condition', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').where('id = 5');

    const expectedOutput = 'SELECT * FROM table WHERE id = 5';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with condition', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').where('id', 5);

    const expectedOutput = 'SELECT * FROM table WHERE id = 5';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').where('id', 5).where('name', 'Bob');

    const expectedOutput = 'SELECT * FROM table WHERE id = 5 AND name = \'Bob\'';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions and fields', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').field('username AS name').field('email').where('id', 5).where('name', 'Bob');

    const expectedOutput = 'SELECT username AS name, email FROM table WHERE id = 5 AND name = \'Bob\'';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with conditions and fields', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').field('username', 'name').field('email').where('id', 5).where('name', 'Bob');

    const expectedOutput = 'SELECT username AS name, email FROM table WHERE id = 5 AND name = \'Bob\'';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with limit property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').limit(10);

    const expectedOutput = 'SELECT * FROM table LIMIT 10';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with offset property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').offset(4);

    const expectedOutput = 'SELECT * FROM table OFFSET 4';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with limit and offset property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').limit(10).offset(4);

    const expectedOutput = 'SELECT * FROM table LIMIT 10 OFFSET 4';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with sort property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').sort('name ASC');

    const expectedOutput = 'SELECT * FROM table ORDER BY name ASC';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with sort property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').sort('name');

    const expectedOutput = 'SELECT * FROM table ORDER BY name';
    expect(builder.build()).to.equal(expectedOutput);
  });

  it('should generate correct SELECT command with sort property', function() {
    const builder = new QueryBuilder();
    builder.select().table('table').sort('name', 'ASC');

    const expectedOutput = 'SELECT * FROM table ORDER BY name ASC';
    expect(builder.build()).to.equal(expectedOutput);
  });
});
