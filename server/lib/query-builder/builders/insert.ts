import {IQuery} from '../index';

export default function buildSelect(query: IQuery) {
  const queryTexts = [];

  const {table, values: data = []} = query

  if (!query.table) {
    throw new Error(`Cannot build new insert command without table property!`);
  }

  queryTexts.push('INSERT INTO', table);

  const properties: Array<string> = [];
  const values: Array<any> = [];
  data.forEach(([property, value]) => {
    properties.push(property);

    if (typeof value === 'string') {
      values.push(`'${value}'`);
    } else if (typeof value === 'boolean') {
      values.push(value ? 'TRUE' : 'FALSE');
    } else {
      values.push(value);
    }
  });

  queryTexts.push(`(${properties.join(', ')})`);
  queryTexts.push('VALUES');
  queryTexts.push(`(${values.join(', ')})`);
  queryTexts.push('RETURNING *');

  return queryTexts.join(' ');
}
