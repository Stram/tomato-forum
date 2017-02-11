import BaseBuilder from './base';

export enum CreateType {
  TABLE = 1,
  INDEX
}

export enum ColumnType {
  STRING,
  TIMESTAMP
}

export enum DefaultValues {
  TODAY
}

export interface ColumnOptions {
  required?: boolean,
  unique?: boolean,
  limit?: number,
  default?: string | number | DefaultValues
}

interface ColumnDescriptor extends ColumnOptions {
  name: string,
  type: ColumnType
}

const subtypeMapping = {
  [CreateType.TABLE]: 'TABLE',
  [CreateType.INDEX]: 'INDEX'
}

export default class CreateBuilder extends BaseBuilder {
  private type: CreateType;
  private name: string;
  private columns: Array<ColumnDescriptor> = [];

  constructor(type?: 'table'|'index', name: string = '') {
    super();
    type === 'table' ? this.table(name) : this.index();
  }

  build() {
    const queryText = [];
    this.ensurePropertyExists(this.type, 'type');
    this.ensurePropertyExists(this.name, 'name');

    queryText.push('CREATE');
    queryText.push(subtypeMapping[this.type]);

    queryText.push(this.buildColumns());

    return queryText.join(' ');
  }

  table(tableName: string) {
    this.type = CreateType.TABLE;
    this.name = tableName;
  }

  index() {
    this.type = CreateType.INDEX;
  }

  addColumn(columnName: string, columnType: ColumnType, options: ColumnOptions) {
    this.columns.push({
      name: columnName,
      type: columnType,
      ...options
    });
    return this;
  }

  private buildColumns() {
    this.columns.map((columnDefinition) => {
      const column = [columnDefinition.name];

      column.push(this.getColumnType(columnDefinition.type, columnDefinition.limit));

      if (columnDefinition.required) {
        column.push('NOT NULL');
      }

      if (columnDefinition.unique) {
        column.push('UNIQUE');
      }

      if (columnDefinition.default) {
        column.push(`DEFAULT ${this.getDefaultValue(columnDefinition.default)}`)
      }

      return column.join(' ');
    }).join(', ');
  }

  private getColumnType(type: ColumnType, limit?: number) {
    switch(type) {
      case ColumnType.STRING:
        this.ensurePropertyExists(limit, 'limit');
        return `varchar(${limit})`;
      case ColumnType.TIMESTAMP:
        return 'timestamp';
      default:
        throw new Error('Unknown column type');
    }
  }

  private getDefaultValue(defaultValue: string | number | DefaultValues) {
    if (typeof defaultValue === 'string') {
      return defaultValue;
    }

    return '';
  }
}