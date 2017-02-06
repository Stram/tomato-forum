import * as pg from 'pg';
import {snakeCase, toPairs} from 'lodash';
import database from 'services/orm';
import QueryBuilder from 'services/query-builder';

export interface IModelSchema {
  [attribute: string]: {
    type: string
    validate?: {
      validator: (value: any) => boolean
      message: string
    },
    required?: string,
    unique?: string,
    default?: Defaults
  }
}

export const Types = {
  string(length: number) {
    return `varchar(${length})`;
  },
  text() {
    return `text`
  },
  timestamp() {
    return 'timestamp'
  }
}

export enum Defaults {
  CURRENT_TIMESTAMP = 1
}

export default class Model <T> {
  private readonly tableName: string;
  private modelSchema: IModelSchema;
  private tableExists = false;

  constructor(tableName: string, modelSchema: IModelSchema) {
    this.tableName = snakeCase(tableName);
    this.modelSchema = modelSchema;
  }

  async query(builder: QueryBuilder | string) {
    await this.ensureTableExists();

    let queryText;

    if (builder instanceof QueryBuilder) {
      builder.table(this.tableName);
      queryText = builder.build();
    } else {
      queryText = builder;
    }
    const document = await database.query(queryText);
    return this.deserialize(document);
  }

  async create(options: T) {
    await this.ensureTableExists();

    const builder = new QueryBuilder();
    builder.table(this.tableName);

    toPairs(options).forEach((pair) => {
      builder.insert(pair[0], pair[1]);
    });

    const newObject = await database.query(builder.build());
    return <T> newObject.rows[0];
  }

  private deserialize(document: pg.QueryResult) {
    const rows = document.rows;
    return <Array<T>> rows;
  }

  private async ensureTableExists() {
    if (this.tableExists) {
      return;
    }

    const queryText = this.buildTableQuery();

    await database.query(queryText);
    this.tableExists = true;
  }

  async dropTable() {
    if (this.tableExists) {
      await database.query(`DROP TABLE ${this.tableName}`);
    }
  }

  private buildTableQuery() {
    const tableAtributes = Object.keys(this.modelSchema).map((attribute) => {
      const attributeDefinition = this.modelSchema[attribute];
      const attributeName = snakeCase(attribute);
      const {type, required, unique, default: defaultValue} = attributeDefinition;

      let column = `${attributeName} ${type}`;

      if (required) {
        column = column + ' NOT NULL';
      }

      if (unique) {
        column = column + ' UNIQUE';
      }

      if (defaultValue && Defaults[defaultValue]) {
        column = column + ` DEFAULT ${Defaults[defaultValue]}`;
      }

      return column;
    });

    const tableDefinition = tableAtributes.join(', ');
    return `CREATE TABLE IF NOT EXISTS "${this.tableName}" (${tableDefinition})`;
  }
}
