import QueryBuilder, {ColumnType} from 'lib/query-builder';
import {QueryResult} from 'pg';

export async function up(builder: QueryBuilder, query: (queryText: string) => Promise<QueryResult>) {
  const tableBuilder = builder.createTable('account')
    .addColumn('username', ColumnType.STRING, {
      limit: 20,
      unique: true
    }).addColumn('email', ColumnType.STRING, {
      limit: 255,
      required: true,
      unique: true
    }).addColumn('password', ColumnType.STRING, {
      limit: 255,
      required: true
    }).addColumn('createdAt', ColumnType.TIMESTAMP, {
      default: true
    }).addColumn('updatedAt', ColumnType.TIMESTAMP, {
      default: true
    });

  await query(tableBuilder.build());
}

export async function down(builder: QueryBuilder) {
  throw new Error('The initial migration is not revertable!');
}