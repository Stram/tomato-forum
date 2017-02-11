import BaseBuilder from './base';

export enum CreateType {
  TABLE = 1,
  INDEX
}

const subtypeMapping = {
  [CreateType.TABLE]: 'TABLE',
  [CreateType.INDEX]: 'INDEX'
}

export default class CreateBuilder extends BaseBuilder {
  private type: CreateType;
  private name: string;

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

    return queryText.join(' ');
  }

  table(tableName: string) {
    this.type = CreateType.TABLE;
    this.name = tableName;
  }

  index() {
    this.type = CreateType.INDEX;
  }
}