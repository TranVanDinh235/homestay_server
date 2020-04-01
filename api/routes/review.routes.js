import express from 'express';
import reviewCtrl from '../controllers/review.controller'

const router = express.Router();

router.route('/:id').get(reviewCtrl.getById);
router.route('/get_by_house/:id').get(reviewCtrl.getByHouse);
router.route('/').post(reviewCtrl.newReview);
router.route('/:id').put(reviewCtrl.update);
router.route('/:id').delete(reviewCtrl.delReview);

export default router;