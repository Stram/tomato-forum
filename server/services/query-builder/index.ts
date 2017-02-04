import selectBuilder from 'services/query-builder/builders/select';
import insertBuilder from 'services/query-builder/builders/insert';

enum CommandType {
  SELECT = 1,
  INSERT,
  UPDATE,
  DELETE
}

export interface IQuery {
  command?: CommandType;
  fields?: Array<string>;
  values?: Array<[string, any]>;
  table?: string;
  limit?: number;
  offset?: number;
  sort?: Array<string>;
  conditions?: Array<string>;
}

export default class QueryBuilder {
  private query: IQuery = {
    fields: [],
    sort: [],
    conditions: []
  };

  select() {
    this.query.command = CommandType.SELECT;
    return this;
  }

  insert() {
    this.query.command = CommandType.INSERT;
    return this;
  }

  update() {
    this.query.command = CommandType.UPDATE;
    return this;
  }

  delete() {
    this.query.command = CommandType.DELETE;
    return this;
  }

  field(fieldName: string, outputName?: string) {
    if (!this.query.fields) {
      this.query.fields = [];
    }
    if (outputName) {
      this.query.fields.push(`${fieldName} AS ${outputName}`);
    } else {
      this.query.fields.push(fieldName);
    }
    return this;
  }

  where(property: string, value?: string | number) {
    if (!this.query.conditions) {
      this.query.conditions = [];
    }
    if (!value) {
      this.query.conditions.push(property);
    } else {
      if (typeof value === 'string') {
        this.query.conditions.push(`${property} = "${value}"`);
      } else {
        this.query.conditions.push(`${property} = ${value}`);
      }
    }

    return this;
  }

  table(tableName: string) {
    this.query.table = tableName;
    return this;
  }

  limit(value: number) {
    this.query.limit = value;
    return this;
  }

  offset(value: number) {
    this.query.offset = value;
    return this;
  }

  sort(sortProperty: string, sortDirection?: 'ASC' | 'DESC') {
    if (!this.query.sort) {
      this.query.sort = [];
    }
    if (sortDirection === 'ASC') {
      this.query.sort.push(`${sortProperty} ASC`);
    } else if (sortDirection === 'DESC') {
      this.query.sort.push(`${sortProperty} DESC`);
    } else {
      this.query.sort.push(`${sortProperty}`);
    }
  }

  value(property: string, value: any) {
    if (!this.query.values) {
      this.query.values = [];
    }
    this.query.values.push([property, value]);
  }

  build() {
    if (!this.query.command) {
      throw new Error(`Cannot build new query without command type!`);
    }

    const buildFunctionMapping = {
      [CommandType.SELECT]: this.buildSelect,
      [CommandType.INSERT]: this.buildInsert,
      [CommandType.UPDATE]: this.buildUpdate,
      [CommandType.DELETE]: this.buildDelete
    }

    return buildFunctionMapping[this.query.command].call(this);
  }

  private buildSelect() {
    return selectBuilder(this.query);
  }

  private buildInsert() {
    return insertBuilder(this.query);
  }

  private buildUpdate() {
    return '';
  }

  private buildDelete() {
    return '';
  }
}
