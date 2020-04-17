const jwtHelper = require("../helpers/jwt.helper");
const debug = console.log.bind(console);

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "access-token-secret-HOMESTAY-VANDINH-160420QW";

let isAuth = async (req, res, next) => {

    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if (tokenFromClient) {
        // Nếu tồn tại token
        try {
            // Thực hiện giải mã token xem có hợp lệ hay không?
            const decoded = await jwtHelper.verifyToken(tokenFromClient, accessTokenSecret);

            // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
            req.jwtDecoded = decoded;

            // Cho phép req đi tiếp sang controller.
            next();
        } catch (error) {

            debug("Error while verify token:", error);
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