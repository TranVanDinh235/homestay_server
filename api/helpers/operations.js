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

export default {
    exec_query,
    build_update_query,
    build_select_query
}