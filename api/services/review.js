import path from "path"
import db from '../helpers/operations'
import utils from '../helpers/utils'
import fs from 'fs'


const NodeRSA = require('node-rsa');
const CURRENT_WORKING_DIR = process.cwd();

const getById = (req) => {
    const table = 'review';
    const review_id = req.params.id;

    return new Promise((resolve, reject) => {
        db.exec_query(db.build_select_query(table, {id : review_id})).then(res => {
            console.log(res);
            if (res.data.success && res.data.rowCount > 0) {
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
                data: "Error on find review"
            })
        })
    });
};

const getByHouse = (req) => {
    const house_id = req.params.id;

    return new Promise((resolve, reject) => {
        db.exec_query(db.getReviewByHouse(house_id)).then(res => {
            console.log(res);
            if (res.data.success && res.data.rowCount > 0) {
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
                data: "Error on find review"
            })
        })
    });
};

const newReview = (request) => {
    const key = new NodeRSA();
    key.setOptions({encryptionScheme: 'pkcs1'});

    return new Promise((resolve, reject) => {

        fs.readFile(path.join(CURRENT_WORKING_DIR, '/keys/private.pem'), 'utf-8', function (err, private_key) {
            if (err) {
                reject({
                    status: false,
                    code: 'API-00102',
                    message: 'Can not load private key'
                })
            } else {
                request = request.replace(/(\r\n|\n|\r)/gm, '');
                key.importKey(private_key, 'pkcs1-private');
                let decrypted_data = key.decrypt(request, "base64");
                decrypted_data = Buffer.from(decrypted_data, 'base64');
                decrypted_data = decrypted_data.toString('utf-8');
                decrypted_data = JSON.parse(decrypted_data);

                if (utils.check_properties_validity(decrypted_data)) {
                    db.exec_query(db.insertReview(decrypted_data), true).then(res => {
                        if (res.data.success && res.data.rowCount > 0) {
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
                            data: "Error on insert review"
                        })
                    })
                } else {

                }
            }
        });
    });
};

const update = (req) => {
    const key = new NodeRSA();
    key.setOptions({encryptionScheme: 'pkcs1'});
    const table = 'review';
    const review_id = req.params.id;
    let data = req.body.data;

    return new Promise((resolve, reject) => {

        fs.readFile(path.join(CURRENT_WORKING_DIR, '/keys/private.pem'), 'utf-8', function (err, private_key) {
            if (err) {
                reject({
                    status: false,
                    code: 'API-00102',
                    message: 'Can not load private key'
                })
            } else {
                data = data.replace(/(\r\n|\n|\r)/gm, '');
                key.importKey(private_key, 'pkcs1-private');
                let decrypted_data = key.decrypt(data, "base64");
                decrypted_data = Buffer.from(decrypted_data, 'base64');
                decrypted_data = decrypted_data.toString('utf-8');
                decrypted_data = JSON.parse(decrypted_data);

                if (utils.check_properties_validity(decrypted_data)) {
                    db.exec_query(db.build_update_query(table,{id: review_id}, decrypted_data), true).then(res => {
                        if (res.data.success && res.data.rowCount > 0) {
                            resolve({
                                status: true,
                                code: 'API-00000'
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
                            data: "Error on update review"
                        })
                    })
                } else {
                    reject({
                        status: false,
                        code: 'DSAN-00401',
                        message: 'Error parameters'
                    })
                }
            }
        });
    });
};

const delReview = (req) => {
    const review_id = req.params.id;

    return new Promise((resolve, reject) => {
        db.exec_delete_query(db.deleteReview(review_id)).then(res => {
            console.log(res);
            if (res.data.success && res.data.rowCount > 0) {
                resolve({
                    status: true,
                    code: 'API-00000'
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
                data: "Error on delete review"
            })
        })
    });
};


export default {
    getById,
    getByHouse,
    newReview,
    update,
    delReview
}