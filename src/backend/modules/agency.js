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
        var isFirstField = true
        var fieldPlaceholders = ''
        var fields = []

        for (let [key, value] of Object.entries(columns)) {
            if(!isFirstField) {
                fieldPlaceholders += ', '
            }
            fieldPlaceholders += '?'
            fields.push(value)
            isFirstField = false
        }


        var query = `select (${fieldPlaceholders}) from AgencyData`
        return new Promise((resolve, reject) => {
            con.query(query, fields, function (err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve ({
                        data: result
                    })
                }
            })
        })
    }
}