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
                data: "Error on find topic"
            })
        })
    });
};

const getTopicItemByTopic = (req) => {
    const item_id = req.params.id;
    console.log(item_id)
    return new Promise((resolve, reject) => {
        db.exec_query(db.getTopicItemByTopic(item_id)).then(res => {
            if (res.data.success && res.data.rowCount > 0) {
                resolve({
                    status: true,
                    code: 'API-00000',
                    data: {
                        topic_item: res.data.rows
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
    });
};

export default {
    getAll,
    getTopicItemByTopic
}