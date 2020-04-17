import db from '../helpers/db_homestay'

const getAll = () => {
    const sql = 'SELECT * FROM topic';
    return new Promise((resolve, reject) => {
        db.pool.query(sql,[], function (err, topics) {
            if(err){
                console.log(err)
                reject(err);
            } else {
                resolve(topics);
            }
        })
    });
};

const getTopicItemByTopic = (topicId) => {
    const sql = "SELECT * FROM topic_item WHERE topic_id = ?";

    return new Promise((resolve, reject) => {
        db.pool.query(sql, topicId, function (err, topicItems) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(topicItems);
            }
        })
    });
};

const getTopicItemById = (topicItemId) => {
    const sql = "SELECT * FROM topic_item WHERE id = ?";

    return new Promise((resolve, reject) => {
        db.pool.query(sql, topicItemId, function (err, topicItems) {
            if(err){
                console.log(err);
                reject(err);
            } else {
                resolve(topicItems[0]);
            }
        })
    });
};

export default {
    getAll,
    getTopicItemByTopic,
    getTopicItemById
}