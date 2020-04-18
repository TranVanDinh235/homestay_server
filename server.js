const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();
const config = require('./api/helpers/config').config;
const house = require('./api/routes/house.routes').router;
const topic = require('./api/routes/topic.routes').router;
const review = require('./api/routes/review.routes').router;
const city = require('./api/routes/city.routes').router;
const auth = require( './api/routes/AuthRoutes').router;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compress());
app.use(helmet());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers","*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});


const registerAuthenticationMiddleware = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length)
        }

        const jwt = require('jsonwebtoken');
        jwt.verify(token, config.secret_key, function (err, decoded) {
            if (err) {
                return res.sendStatus(400)
            } else {
                if (decoded.access_token_key === config.access_token_key) {
                    next()
                } else {
                    return res.sendStatus(400)
                }
            }
        })
    } else {
        return res.sendStatus(400)
    }
};

app.use(config.prefix_api + '/authorization', auth);
// app.use(config.prefix_api + '/topic', registerAuthenticationMiddleware, topic);
// app.use(config.prefix_api + '/house', registerAuthenticationMiddleware, house);
// app.use(config.prefix_api + '/review', registerAuthenticationMiddleware, review);
// app.use(config.prefix_api + '/city', registerAuthenticationMiddleware, city);
// app.use(config.prefix_api + '/city', registerAuthenticationMiddleware, city);
app.use(config.prefix_api + '/topic', topic);
app.use(config.prefix_api + '/house', house);
app.use(config.prefix_api + '/review', review);
app.use(config.prefix_api + '/city', city);

app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
});

app.listen(config.server_port);

console.log('API server started on: ' + config.server_port);