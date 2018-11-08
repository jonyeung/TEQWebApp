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

    saveQuery: function(query_name, column_list) {
        const query = 'insert into PresetQueries (query_name, query) values (?, ?)'
        return new Promise((resolve, reject) => {
            con.query(query, [query_name, column_list], function(err, result) {
                console.log(result)
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
    }
    
}
