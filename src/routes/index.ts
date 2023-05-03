// var express = require('express');
import {Router} from 'express';
// import prohibitedVisitor from './prohibitedVisitor';
import usersRouter from './userRoutes';
import projectRoutes from './projectRoutes';
// import visitorRouter from './visitor';

const router: Router = Router();

usersRouter(router);
projectRoutes(router);
// visitorRouter(router);
// prohibitedVisitor(router);

export default router;
