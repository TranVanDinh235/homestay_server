import authorizationService from '../services/authorization';

const get = (req, res, next) => {
    authorizationService.getInfo().then(response => {
        return res.json(response)
    }).catch(err => {
        return res.json(err)
    })
};

export default {
    get
}