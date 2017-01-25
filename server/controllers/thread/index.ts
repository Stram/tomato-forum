import {Request, Response} from 'express';

import Category from 'models/category';
import Thread from 'models/thread';
import BaseController from 'controllers/base';

import ResponseStatus from 'enums/response-status';

export default class ThreadController extends BaseController {

  static async index(req: Request, res: Response) {
    const paginationOptions = this.paginationOptions(req);

    // add filters

    const result = await Thread.paginate({}, paginationOptions);
    const items = result.docs;
    const meta = this.getMetaInfo(result);
    const response = {items, meta};

    res.send(response);
  }

  static async show(req: Request, res: Response) {
    const threadId = req.params.threadId;

    // validate thread id

    const thread = await Thread
      .findById(threadId)
      .deepPopulate(['owner.profilePhoto', 'comments.user.profilePhoto']);

    if (!thread) {
      // return NotFound
    }

    res.json(thread.toObject());
  }

  static async create(req: Request, res: Response, next: Function) {
    const {categoryId, content, title} = req.body;

    // validateCategoryId

    const category = await Category.findById(categoryId);

    if (!category) {
      // return BadRequest
    }

    // XSS for content and title

    const newThread = new Thread({
      category,
      title,
      content,
      owner: req.user.id
    });

    category.threads.push(newThread);
    await Promise.all([newThread.save(), category.save()]);

    res.status(ResponseStatus.CREATED).json({
      thread: newThread.toObject()
    });
  }
}
