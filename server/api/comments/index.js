import express from 'express';

import permissions from 'services/permissions';
import paginationMiddleware from 'middlewares/pagination';

import create from './handlers/create';
import getAll from './handlers/get-all';
import getAllFilters from './handlers/get-all/filters';

const router = new express.Router();

router.use(permissions.checkAuthentification);

router.post('/', create);

router.get('/', paginationMiddleware, getAllFilters, getAll);

module.exports = router;
