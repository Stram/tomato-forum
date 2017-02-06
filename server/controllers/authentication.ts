import {Request, Response, NextFunction} from 'express';
import * as passport from 'passport';

import {BadRequest} from 'services/errors';
import User from 'models/user';
import ResponseStatus from 'enums/response-status';

export function login(req: Request, res: Response, next: NextFunction) {
  passport.authenticate('local-login', (error: any, user: User | null, info?: any) => {
    if (error) {
      next(error);
      return;
    }

    if (!user) {
      next(new BadRequest(info));
      return;
    }

    res.status(200).json({
      user: user.serialize()
    });
  })(req, res, next);
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout();
  res.sendStatus(ResponseStatus.OK);
}

export async function register(req: Request, res: Response, next: NextFunction) {
  console.log('REGISTER');
  passport.authenticate('local-register', (error: any, user: User | null, info?: any) => {
    if (error) {
      next(error);
      return;
    }
    console.log('REGISTER2');
    if (!user) {
      next(new BadRequest(info));
      return;
    }
    console.log('REGISTER3');

    res.status(ResponseStatus.CREATED);
    res.json({
      user: user.serialize()
    });
  })(req, res, next);
}
