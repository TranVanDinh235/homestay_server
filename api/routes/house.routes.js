const express = require('express');
const houseCtrl = require ('../controllers/house.controller')

const router = express.Router();

router.route('/:id').get(houseCtrl.get);
router.route('/topic-item/:id').get(houseCtrl.getByTopicItem);
router.route('/collection/:id').get(houseCtrl.getByCollection);
router.route('/city/:id').get(houseCtrl.getByCity);

module.exports.router = router;