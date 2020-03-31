import path from "path"
import db from '../helpers/operations'
import utils from '../helpers/utils'
import config from '../helpers/config'
import fs from 'fs'

const NodeRSA = require('node-rsa');
const CURRENT_WORKING_DIR = process.cwd();

const getAll = (request) => {
    const table = 'topic';
    return new Promise((resolve, reject) => {
        db.exec_query(db.build_select_query(table)).then(res => {
            console.log(res);
            if(res.data.success && res.data.rowCount > 0){
                resolve({
                    status: true,
                    code: 'API-00000',
                    data: {
                        topics: res.data.rows
                    }
                })
            } else {
                reject({
                    status: false,
                    code: 'API-00400',
                    data: "No result"
                })
            }
        }).catch((err) => {
            console.log(err);
            reject({
                status: false,
                code: 'API-00402',
                data: "Error on find topic"
            })
        })
    });
};

const getTopicItem = (request) => {
    const key = new NodeRSA();
    const table = 'topic_item';
    key.setOptions({ encryptionScheme: 'pkcs1' });


    return new Promise((resolve, reject) => {
        fs.readFile(path.join(CURRENT_WORKING_DIR, '/keys/private.pem'), 'utf-8', function (err, private_key) {
            if (err) {
                reject({
                    status: false,
                    code: 'API-00102',
                    message: 'Can not load private key'
                })
            } else  {
                request = request.replace(/(\r\n|\n|\r)/gm, '');
                key.importKey(private_key, 'pkcs1-private');
                let decrypted_data = key.decrypt(request, "base64");
                decrypted_data = Buffer.from(decrypted_data, 'base64');
                decrypted_data = decrypted_data.toString('utf-8');
                decrypted_data = JSON.parse(decrypted_data);

                if (utils.check_properties_validity(decrypted_data)) {
                    db.exec_query(db.build_select_query(table, decrypted_data, false)).then(res => {
                        console.log(res);
                        if(res.data.success && res.data.rowCount > 0){
                            resolve({
                                status: true,
                                code: 'API-00000',
                                data: {
                                    topics: res.data.rows
                                }
                            })
                        } else {
                            reject({
                                status: false,
                                code: 'API-00001',
                                data: "No result"
                            })
                        }
                    }).catch((err) => {
                        console.log(err);
                        reject({
                            status: false,
                            code: 'API-00402',
                            data: "Error on find topic"
                        })
                    })
                } else {
                    reject({
                        status: false,
                        code: 'API-00401',
                        message: 'Invalid input'
                    })
                }
            }
        });
    });
};

export default {
    getAll,
}