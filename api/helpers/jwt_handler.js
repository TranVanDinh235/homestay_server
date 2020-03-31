var jwt = require('jsonwebtoken');
require('dotenv').config();
var secret_key = process.env.SECRET_KEY;

const sign_token = (req, res) => {
    var payload = {
        username: process.env.USER_API,
        password: process.env.PASS_API,
        organization: process.env.ORGANIZATION,
        project: process.env.PROJECT_NAME,
        created_by: process.env.CODER_BY
    };
    let secret = req.body.secret_key;

    if (secret) {
        if (secret === secret_key) {
            let token = jwt.sign(payload, secret_key);
            // return the JWT token for the future API calls
            res.json({
                success: true,
                message: 'Sign token successful!',
                token: token
            });
        } else {
            res.send(403).json({
                success: false,
                message: 'Incorrect secret_key'
            });
        }
    } else {
        res.send(400).json({
            success: false,
            message: 'Sign token failed! Please check the request'
        });
    }
}

const verify_token = (req, res, next) => {
    var token = req.headers['x-access-token'] || req.headers['authorization'];

    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }

        jwt.verify(token, secret_key, function (err, decoded) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
}

export default {
    sign_token,
    verify_token
}