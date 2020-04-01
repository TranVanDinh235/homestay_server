import reviewService from '../services/review';

const getById = (req, res, next) => {
    reviewService.getById(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const getByHouse = (req, res, next) => {
    reviewService.getTopicItemByTopic(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const newReview = (req, res, next) => {
    reviewService.newReview(req.body.data).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const update = (req, res, next) => {
    reviewService.update(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const delReview = (req, res, next) => {
    reviewService.delReview(req).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

export default {
    getById,
    getByHouse,
    newReview,
    update,
    delReview
}