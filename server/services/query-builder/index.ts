import selectBuilder from 'services/query-builder/builders/select';

enum CommandType {
  SELECT = 1,
  INSERT,
  UPDATE,
  DELETE
}

export interface IQuery {
  command?: CommandType;
  fields: string[];
  values?: any[];
  table?: string;
  limit?: number;
  offset?: number;
  sort: string[];
  conditions: string[];
}

export default class QueryBuilder {
  private query: IQuery = {
    fields: [],
    conditions: [],
    sort: []
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
    if (outputName) {
      this.query.fields.push(`${fieldName} AS ${outputName}`);
    } else {
      this.query.fields.push(fieldName);
    }
    return this;
  }

  where(property: string, value?: string | number) {
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
    if (sortDirection === 'ASC') {
      this.query.sort.push(`${sortProperty} ASC`);
    } else if (sortDirection === 'DESC') {
      this.query.sort.push(`${sortProperty} DESC`);
    } else {
      this.query.sort.push(`${sortProperty}`);
    }
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
    return '';
  }

  private buildUpdate() {
    return '';
  }

  private buildDelete() {
    return '';
  }
}
