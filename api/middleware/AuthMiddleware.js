const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret";

let isAuth = async (req, res, next) => {

    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

            req.jwtDecoded = decoded;

            next();
        } catch (error) {
            return res.status(401).json({
                message: 'Unauthorized.',
            });
        }
    } else {
        // Không tìm thấy token trong request
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};

module.exports = {
    isAuth: isAuth,
};