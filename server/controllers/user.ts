import {Request, Response} from 'express';

import User from 'models/user';

export async function index(req: Request, res: Response) {
  const userId = req.params.userId;

  // validate id

  const user = await User.find(userId);

  if (!user) {
    // return NotFound
  }

  res.json(user.serialize());
}
