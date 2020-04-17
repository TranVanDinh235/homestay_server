import express from 'express';
import authorizationController from '../controllers/authorization.controller'

const router = express.Router();

router.route('/').get(authorizationController.get);

export default router;