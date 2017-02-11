import BaseBuilder from './base';

export enum OrderDirection {
  ASC,
  DESC
}

interface sortDescriptor {
  property: string;
  direction: OrderDirection
}

export default class SelectBuilder extends BaseBuilder {
  private query: {
    fields?: Array<string|[string, string]>;
    table?: string;
    limit?: number;
    offset?: number;
    sort?: Array<sortDescriptor>;
    conditions?: Array<string>;
  };

  constructor(fieldsDescription: Array<string|[string, string]> | string = []) {
    super();
    this.fields(fieldsDescription);
  }

  fields(fieldsDescription: Array<string|[string, string]> | string) {
    this.query.fields = this.query.fields || [];
    if (typeof fieldsDescription === 'string') {
      this.query.fields.push(fieldsDescription);
    } else {
      this.query.fields.concat(fieldsDescription);
    }
    return this;
  }

  where(queryProperty: string, queryValue?: any) {
    this.query.conditions = this.query.conditions || [];
    if (queryValue) {
      this.query.conditions.push(`${queryProperty} = ${queryValue}`);
    } else {
      this.query.conditions.push(queryProperty);
    }
    return this;
  }

  sort(orderParam: string, orderDirection: OrderDirection) {
    this.query.sort = this.query.sort || [];
    this.query.sort.push({
      property: orderParam,
      direction: orderDirection
    });
    return this;
  }

  sortAsc(orderParam: string) {
    return this.sort(orderParam, OrderDirection.ASC);
  }

  sortDesc(orderParam: string) {
    return this.sort(orderParam, OrderDirection.DESC);
  }

  limit(limit: number) {
    this.query.limit = limit;
    return this;
  }

  offset(offset: number) {
    this.query.offset = offset;
    return this;
  }

  table(tableName: string) {
    this.query.table = tableName;
    return this;
  }

  from(tableName: string) {
    return this.table(tableName);
  }

  build() {
    const queryTexts = [];
    const {table, limit, offset, sort = [], conditions = []} = this.query;
    this.ensurePropertyExists(table, 'table');

    const fields = this.buildFields();

    queryTexts.push('SELECT', fields);
    queryTexts.push('FROM', table);

    if (conditions.length) {
      const condition = conditions.join(' AND ');
      queryTexts.push('WHERE', condition);
    }

    if (sort.length) {
      queryTexts.push('ORDER BY', sort.join(', '));
    }

    if (limit) {
      queryTexts.push('LIMIT', limit);
    }

    if (offset) {
      queryTexts.push('OFFSET', offset);
    }

    return queryTexts.join(' ');
  }

  private buildFields() {
    if (!this.query.fields) {
      return '*';
    }

    return this.query.fields.map((fieldDescription) => {
      return Array.isArray(fieldDescription) ? fieldDescription.join(' AS ') : fieldDescription;
    }).join(', ');
  }
}