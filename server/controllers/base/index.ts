import {Request} from 'express';

export default class BaseController {
  static paginationOptions(req: Request) {
    const page = parseInt(req.query.page, 10);
    const perPage = parseInt(req.query.perPage, 10);
    const limit = parseInt(req.query.limit, 10);

    return {
      page: page || 1,
      limit: perPage || limit || 30
    };
  }

  static getMetaInfo(paginationResult) {
    const {page, total} = paginationResult;
    return {page, total};
  }
}
