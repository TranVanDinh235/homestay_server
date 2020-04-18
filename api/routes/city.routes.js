const express = require('express');
const cityCtrl = require('../controllers/city.controller');

const router = express.Router();

router.route('/').get(cityCtrl.getAll);
router.route('/:id').get(cityCtrl.get);

module.exports.router = router;