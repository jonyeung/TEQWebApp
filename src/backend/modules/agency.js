const {con} = require('./mysql')

module.exports = {
    insertRow: function(row) {
        var isFirstField = true
        var fieldPlaceholders = ''
        var valuePlaceholders = ''
        var fields = []
        var values = []
        for (let [key, value] of Object.entries(row)) {
            if (!isFirstField) {
                fieldPlaceholders += ', '
                valuePlaceholders += ', '
            }
            valuePlaceholders += '?'
            fieldPlaceholders += '??'
            fields.push(key)
            values.push(value)
            isFirstField = false
        }
        var query = `insert into AgencyData (${fieldPlaceholders}) values (${valuePlaceholders}) `
        return new Promise((resolve, reject) => {
            con.query(query, fields.concat(values), function (err, result) {
                if (err) {
		            console.log(err)
                    reject(err)
                } else {
                    resolve({
                        result
                    })
                }
            })
        })
    },


    retrieveData: function(columns) {
        var query = `select `
        var isFirstField = true
        for (var i = 0; i < columns.length;i++) {
            if(!isFirstField) {
                query += ', '
            }
            isFirstField = false
            query += columns[i]
        }
        query += ` from AgencyData`
        return new Promise((resolve, reject) => {
            con.query(query, function (err, result) {
                if (err) {
		            console.log(err)
                    reject(err)
                } else {
                    resolve ({
                        data: result
                    })
                }
            })
        })
    },

    saveQuery: function(query_name, column_list, id) {
        const query = 'insert into PresetQueries (query_name, query) values (?, ?)'
        column_list = (Array.isArray(column_list) ? column_list : [ column_list ])
        return new Promise((resolve, reject) => {
            // store queries as json
            con.query(query, [query_name, JSON.stringify(column_list)], function(err, result) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    const insertResult = result
                    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    const logQuery = 'insert into QueryLog (userID, time_stamp, query) values (?, ?, ?)'

                    con.query(logQuery, [id, timestamp, query_name], function(err, result) {
                        if (err) {
                            reject(err)
                        } else {
                            resolve({
                                insertResult
                            })
                        }
                    })
                }
            })
        })
    },

    getPresetQueries: function() {
        const query = 'select * from PresetQueries'
        return new Promise((resolve, reject) => {
            con.query(query, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    ret = {}
                    result.forEach((queryObj) => {
                        const {query_name, query} = queryObj
                        ret[query_name] = JSON.parse(query)
                    })
                    resolve(ret)
                }
            })
        })
    },

    deleteRow: function(id) {
        const query = 'delete from AgencyData where update_record_id = ?'
        return new Promise((resolve, reject) => {
            con.query(query, [ id ], function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    },

    retrieveLogs: function() {
        const query = "select * from QueryLog"
        return new Promise((resolve, reject) => {
            con.query(query, function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }

}
