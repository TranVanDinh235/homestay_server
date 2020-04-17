import reviewService from '../model/review';

const get = (req, res, next) => {
    reviewService.get(req.params.id).then(review => {
        return res.json(review)
    }).catch(err => {
        return res.json(err)
    })
};

const getByHouse = (req, res, next) => {
    reviewService.getByHouse(req.params.id).then(reviews => {
        return res.json(reviews)
    }).catch(err => {
        return res.json(err)
    })
};

const insert = (req, res, next) => {
    reviewService.insert(req.body.data).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const update = (req, res, next) => {
    reviewService.update(req.body.data).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

const remove = (req, res, next) => {
    reviewService.remove(req.params.id).then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

export default {
    get,
    getByHouse,
    insert,
    update,
    remove,
}