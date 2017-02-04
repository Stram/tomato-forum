import {Router} from 'express';
import UtilController from 'controllers/util';
import * as ThreadController from 'controllers/thread';

const router: Router = Router();

router.get('/', [
  UtilController.authenticated,
  ThreadController.index
]);

router.get('/:threadId', [
  UtilController.authenticated,
  ThreadController.show
]);

router.post('/', [
  UtilController.authenticated,
  ThreadController.create
]);

export default router;
