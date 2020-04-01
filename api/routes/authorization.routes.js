import express from 'express';
import authorizationController from '../controllers/authorization.controller'

const router = express.Router();

router.route('/get_authorization').get(authorizationController.get);

export default router;