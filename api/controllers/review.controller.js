const reviewService = require('../model/review');

module.exports.get = (req, res, next) => {
    reviewService.get(req.params.id).then(review => {
        return res.json(review)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.getByHouse = (req, res, next) => {
    reviewService.getByHouse(req.params.id).then(reviews => {
        return res.json(reviews)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.insert = (req, res, next) => {
    reviewService.insert(req.body.data).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.update = (req, res, next) => {
    reviewService.update(req.body.data).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

module.exports.remove = (req, res, next) => {
    reviewService.remove(req.params.id).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};