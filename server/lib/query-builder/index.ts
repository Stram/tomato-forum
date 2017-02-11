import SelectBuilder from './builders/select';
import CreateBuilder, {ColumnType} from './builders/create';

export {
  SelectBuilder,
  ColumnType
};

export default class QueryBuilder {
  select(fieldsDescription?: Array<string|[string, string]> | string) {
    return new SelectBuilder(fieldsDescription);
  }

  create(type?: 'table'|'index', name?: string) {
    return new CreateBuilder(type, name);
  }

  createTable(tableName: string) {
    return new CreateBuilder('table', tableName);
  }

  createIndex() {
    return new CreateBuilder('index');
  }
}
