const express = require('express');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();

router.route('/:id').get(userCtrl.get);

module.exports.router = router;