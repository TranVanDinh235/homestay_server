const bcrypt = require('bcrypt');

const jwtHelper = require("../helpers/jwt.helper");
const googleAuth = require("../helpers/googleAuth");
const facebookAuth = require("../helpers/facebookAuth");
const User = require("../model/user");

const debug = console.log.bind(console);

let tokenList = {};

const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || "1h";
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";
const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE || "3650d";
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "refresh-token-secret";

const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const users = await User.getByEmail(email);
        if(users.length > 0){
            const user = users[0];
            const compare = await bcrypt.compare(password, user.password);

            if(compare){
                const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

                const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
                tokenList[refreshToken] = {accessToken, refreshToken};

                res.status(200).json({
                    status_code: 200,
                    user: user,
                    access_token: accessToken,
                    refresh_token: refreshToken,
                    error: ""
                })
            } else {
                return res.status(202).json({
                    status_code: 202,
                    message: "wrong password"
                });
            }
        } else {
            return res.status(201).json({
                status_code: 201,
                message: "wrong email"
            });
        }
    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            error: error
        });
    }
};


let loginGoogle = async (req, res) => {
    try {
        const googleUser = await googleAuth.getGoogleUser(req.body.token);
        let user;

        const users = await User.getBySocialId(googleUser.id);
        if(users.length === 0){
            user = await User.insert(googleUser);
        } else {
            user = googleUser;
            user.id = users[0].id;
        }
        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        tokenList[refreshToken] = {accessToken, refreshToken};

        res.status(200).json({
            status_code : 200,
            user: user,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            error: error
        });
    }
};

let loginFacebook = async (req, res) => {
    try {
        const facebookUser = await facebookAuth.getUser(req.body.token);
        let user;

        const users = await User.getBySocialId(facebookUser.id);
        if(users.length === 0){
            user = await User.insert(facebookUser);
        } else {
            user = facebookUser;
            user.id = users[0].id;
        }

        const accessToken = await jwtHelper.generateToken(user, accessTokenSecret, accessTokenLife);

        const refreshToken = await jwtHelper.generateToken(user, refreshTokenSecret, refreshTokenLife);
        tokenList[refreshToken] = {accessToken, refreshToken};

        res.status(200).json({
            status_code : 200,
            user: user,
            access_token: accessToken,
            refresh_token: refreshToken
        })
    } catch (error) {
        return res.status(500).json({
            status_code: 500,
            error: error
        });
    }
};

let refreshToken = async (req, res) => {

    const refreshTokenFromClient = req.body.refresh_token;

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);

            const userData = decoded.data;

            const accessToken = await jwtHelper.generateToken(userData, accessTokenSecret, accessTokenLife);

            return res.status(200).json({
                status_code: 200,
                accessToken,
            });
        } catch (error) {
            res.status(403).json({
                status_code: 403,
                message: 'Invalid refresh token.',
            });
        }
    } else {
        return res.status(403).send({
            status_code: 403,
            message: 'No token provided.',
        });
    }
};

module.exports = {
    login,
    refreshToken,
    loginFacebook,
    loginGoogle,
};