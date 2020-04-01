import db from '../helpers/operations';

const NodeRSA = require('node-rsa');
const CURRENT_WORKING_DIR = process.cwd();

const getById = (req) => {
    const table = 'houses';
    const house_id = req.params.id;

    return new Promise((resolve, reject) => {
        db.exec_query(db.build_select_query(table, {id: house_id}, false)).then(res => {
            if (res.data.success && res.data.rowCount > 0) {
                resolve({
                    status: true,
                    code: 'API-00000',
                    data: {
                        house: res.data.rows[0]
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
                data: "Error on find house"
            })
        })

    });
};

const getByTopicItem = (req) => {
    const topic_item_id = req.params.id;

    return new Promise((resolve, reject) => {
        db.exec_query(db.getHouseByTopicItem(topic_item_id)).then(res => {
            if (res.data.success && res.data.rowCount > 0) {
                resolve({
                    status: true,
                    code: 'API-00000',
                    data: {
                        house: res.data.rows
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
                data: "Error on find house"
            })
        })
    });
};

const getByCollection = (req) => {
    const collection_id = req.params.id;

    return new Promise((resolve, reject) => {
        db.exec_query(db.getHouseByCollection(collection_id)).then(res => {
            if (res.data.success && res.data.rowCount > 0) {
                resolve({
                    status: true,
                    code: 'API-00000',
                    data: {
                        house: res.data.rows
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
                data: "Error on find house"
            })
        })
    });
};


export default {
    getByTopicItem,
    getById,
    getByCollection,
}