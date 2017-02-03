import {IQuery} from 'services/query-builder';

export default function buildSelect(query: IQuery) {
  const queryTexts = [];
  const {table, limit, offset, sort, conditions} = query;
  if (!query.table) {
    throw new Error(`Cannot build new select command without table property!`);
  }

  const fields = query.fields.length ? query.fields : ['*'];

  queryTexts.push('SELECT', fields.join(', '));
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
