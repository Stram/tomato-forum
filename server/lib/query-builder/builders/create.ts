import BaseBuilder from './base';

export enum CreateType {
  TABLE = 1,
  INDEX
}

export enum ColumnType {
  STRING,
  TIMESTAMP
}

export interface ColumnOptions {
  required?: boolean,
  unique?: boolean,
  limit?: number,
  default?: string | number | boolean
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
  private options: {
    ifNotExists?: boolean
  };

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
    if (this.ifNotExists && this.type === CreateType.TABLE) {
      queryText.push('IF NOT EXISTS');
    }

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

  ifNotExists() {
    this.options.ifNotExists = true;
    return this;
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
        column.push(`DEFAULT ${this.getDefaultValue(columnDefinition.default, columnDefinition.type)}`)
      }

      return column.join(' ');
    }).join(', ');
  }

  private getColumnType(type: ColumnType, limit: number = 255) {
    switch(type) {
      case ColumnType.STRING:
        return `VARCHAR(${limit})`;
      case ColumnType.TIMESTAMP:
        return 'TIMESTAMP';
      default:
        throw new Error('Unknown column type');
    }
  }

  private getDefaultValue(defaultValue: string | number | boolean, type: ColumnType) {
    if (type === ColumnType.TIMESTAMP && defaultValue) {
      return 'CURRENT_TIMESTAMP';
    }
    return typeof defaultValue === 'string' ? `"${defaultValue}"` : defaultValue;
  }
}