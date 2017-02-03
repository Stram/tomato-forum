import Model from 'services/orm/model';
import QueryBuilder from 'services/query-builder';

abstract class BaseModel<T> {
  protected document: T;
  protected static model: Model;

  constructor(document: T) {
    this.document = document;
  }

  static find(id: number) {
    const queryBuilder = new QueryBuilder();
    queryBuilder.select()
      .where('id', id)
      .limit(1)

    return this.model.query(queryBuilder);
  }
}

export default BaseModel;
