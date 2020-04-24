const cityService = require('../model/city');

module.exports.getAll = (req, res, next) => {
    cityService.getAll().then(cites => {
        return res.json({
            status_code: 200,
            cities: cites,
            error: ""
        })
    }).catch(err => {
        return res.json({
            status_code: 400,
            error: err
        })
    })
};

module.exports.get = (req, res, next) => {
    cityService.get(req.params.id).then(city => {
        return res.json({
            status_code: 200,
            cities: city,
            error: ""
        })
    }).catch(err => {
        return res.json({
            status_code: 400,
            error: err
        })
    })
};