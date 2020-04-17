import cityService from '../model/city';

const getAll = (req, res, next) => {
    cityService.getAll().then(cites => {
        return res.json({
            status_code: 200,
            data: cites,
            error: ""
        })
    }).catch(err => {
        return res.json({
            status_code: 400,
            error: err
        })
    })
};

const get = (req, res, next) => {
    cityService.get(req.params.id).then(city => {
        return res.json({
            status_code: 200,
            data: city,
            error: ""
        })
    }).catch(err => {
        return res.json({
            status_code: 400,
            error: err
        })
    })
};

export default {
    getAll,
    get
}