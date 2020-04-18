const express = require('express');
const reviewCtrl = require('../controllers/review.controller');

const router = express.Router();

router.route('/:id').get(reviewCtrl.get);
router.route('/house/:id').get(reviewCtrl.getByHouse);
router.route('/').post(reviewCtrl.insert);
router.route('/:id').put(reviewCtrl.update);
router.route('/:id').delete(reviewCtrl.remove);

module.exports.router = router;