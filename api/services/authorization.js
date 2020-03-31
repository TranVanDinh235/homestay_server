import path from 'path'
import fs from 'fs'
import config from '../helpers/config'

const jwt = require('jsonwebtoken');
const CURRENT_WORKING_DIR = process.cwd();

const getInfo = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.join(CURRENT_WORKING_DIR, '/keys/public.pem'), 'utf-8', function (err, public_key) {
            if (err) {
                reject({
                    status: false,
                    code: 'HOMESTAY-00101',
                    message: 'Can not load public key'
                })
            } else {
                public_key = public_key.replace('-----BEGIN PUBLIC KEY-----', '').replace('-----END PUBLIC KEY-----', '').replace(/(\r\n|\n|\r)/gm, '');
                const token = jwt.sign({access_token_key: config.access_token_key}, config.secret_key, {expiresIn: config.reset_password_token_expiry});

                resolve({
                    status: true,
                    code: 'HOMESTAY-00000',
                    message: {
                        public_key: public_key,
                        token: token
                    }
                })
            }
        });

    })
};

export default {
    getInfo
}