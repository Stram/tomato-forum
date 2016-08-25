import express from 'express';

import permissions from '~/services/permissions';

import create from './handlers/create';
import getAll from './handlers/get-all';

const router = new express.Router();

router.use(permissions.checkAuthentification);

router.post('/', create);

router.get('/', getAll);

module.exports = router;
