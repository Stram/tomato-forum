import {Router} from 'express';

import api from 'router/api';

const router: Router = Router();

router.use('/api', api);

export default router;
