import db from './index';

const build_select_query = (table, wheres = null, accept_null = false, not_equal_wheres = null) => {
    let query = `SELECT * FROM ${table}`;

    if (wheres) {
        let keys_str = '';
        query += ' WHERE ';
        if (accept_null) {
            Object.keys(wheres).forEach(field => {
                keys_str += `${field} IS NULL`;
                keys_str += ' AND '
            })
        } else {
            Object.keys(wheres).forEach(field => {
                keys_str += typeof wheres[field] == 'string' ? `${field} = '${wheres[field]}'` : `${field} = ${wheres[field]}`;
                keys_str += ' AND '
            })
        }

        if (not_equal_wheres) {
            Object.keys(not_equal_wheres).forEach(field => {
                keys_str += typeof not_equal_wheres[field] == 'string' ? `${field} != '${not_equal_wheres[field]}'` : `${field} != ${not_equal_wheres[field]}`;
                keys_str += ' AND '
            })
        }

        query += keys_str;
        query = query.substr(0, query.length - 5)
    }

    console.log(query);
    return query
};

const build_update_query = (table, keys, fields, isNull = false) => {
    let keys_str = '';
    let values_str = '';
    let query = `UPDATE ${table} SET `;
    let keyNames = Object.keys(keys);

    Object.keys(fields).forEach(field => {
        if (field !== 'id') {
            values_str += typeof fields[field] == 'string' ? `${field} = ${isNull ? 'NULL' : `'${fields[field]}'`},` : `${field} = ${isNull ? 'NULL' : fields[field]},`
        }
    });

    query += values_str.substr(0, values_str.length - 1) + ` WHERE `;

    keyNames.forEach(field => {
        keys_str += typeof keys[field] == 'string' ? `${field} = '${keys[field]}'` : `${field} = ${keys[field]}`;
        keys_str += ' AND '
    });
    query += keys_str;
    query = query.substr(0, query.length - 5);

    return query
};

const exec_query = (query, is_update = false) => {
    return new Promise((resolve, reject) => {
        db.pool.query(query, (err, res) => {
            if (err) {
                reject({
                    success: false,
                    data: null,
                    error: err.sqlMessage
                })
            } else {
                if (is_update) {
                    const isNotSelectQuery = res && res.affectedRows > 0;

                    if (isNotSelectQuery) {
                        const info = res || null;
                        const results = res || [];
                        resolve({
                            success: true,
                            data: {
                                success: !!(info && info.affectedRows > 0),
                                rowCount: info ? info.affectedRows : 0,
                                rows: results
                            },
                            error: null
                        })
                    } else {
                        resolve({
                            success: true,
                            data: {
                                success: res > 0,
                                rowCount: res.affectedRows,
                                rows: res
                            },
                            error: null
                        })
                    }
                } else {
                    const isNotSelectQuery = res[0] && res[0].affectedRows > 0;

                    if (isNotSelectQuery) {
                        const info = res[0] || null;
                        const results = res[1] || [];
                        resolve({
                            success: true,
                            data: {
                                success: !!(info && info.affectedRows > 0),
                                rowCount: info ? info.affectedRows : 0,
                                rows: results.map(r => Object.assign({}, r))
                            },
                            error: null
                        })
                    } else {
                        resolve({
                            success: true,
                            data: {
                                success: res.length > 0,
                                rowCount: res.length,
                                rows: res.map(r => Object.assign({}, r))
                            },
                            error: null
                        })
                    }
                }
            }
        })
    })
};

const exec_delete_query = (query) => {
    return new Promise((resolve, reject) => {
        db.pool.query(query, (err, res) => {
            if (err) {
                reject({
                    success: false,
                    data: null,
                    error: err.sqlMessage
                })
            } else {
                resolve({
                    success: true,
                    data: {
                        success: res.affectedRows > 0,
                        rowCount: res.affectedRows
                    },
                    error: null
                })
            }
        });
    });
};

const getHouseByTopicItem = (condition = null) => {
    let query = "SELECT h.*, th.id AS topic_house_id FROM houses h INNER JOIN topic_item_house th ON h.id = th.house_id";

    if (condition) query += ` WHERE th.topic_item_id = '${condition}'`;

    return query
};

const getTopicItemByTopic = (condition = null) => {
    let query = "SELECT ti.*, t.id AS topic_id FROM topic t INNER JOIN topic_item ti ON t.id = ti.topic_id";

    if (condition) query += ` WHERE t.id = '${condition}'`;

    return query
};

const getHouseByCollection = (condition = null) => {
    let query = "SELECT h.*, c.id AS collection_id, c.time FROM collection c INNER JOIN houses h ON c.house_id = h.id";

    if (condition) query += ` WHERE c.guest_id = '${condition}'`;

    return query
};

const getReviewByHouse = (condition = null) => {
    let query = "SELECT r.*, h.id AS house_id FROM houses h INNER JOIN review r ON h.id = r.house_id";

    if (condition) query += ` WHERE h.id = '${condition}'`;

    return query
};

const insertReview = (data) => {
    if(data){
        return `INSERT INTO review (house_id, guest_id, content, time) VALUES ( '${data.house_id}', '${data.guest_id}', '${data.content}', '${Date.now()/1000}')`
    }
    return "";
};

const deleteReview = (condition = null) => {
    let query = "DELETE FROM review";

    if (condition) query += ` WHERE review.id = '${condition}'`;

    return query
};

export default {
    exec_query,
    exec_delete_query,
    build_update_query,
    build_select_query,
    getHouseByTopicItem,
    getTopicItemByTopic,
    getHouseByCollection,
    getReviewByHouse,
    insertReview,
    deleteReview,
}