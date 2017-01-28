import {Router} from 'express';
import UtilController from 'controllers/util';
import ThreadController from 'controllers/thread';

const router = Router();

router.get('/threads', [
  UtilController.authenticated,
  ThreadController.index
]);

router.get('/threads/:threadId', [
  UtilController.authenticated,
  ThreadController.show
]);

router.post('/threads', [
  UtilController.authenticated,
  ThreadController.create
]);

export default router;
