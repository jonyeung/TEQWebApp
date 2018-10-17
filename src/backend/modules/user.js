var {con} = require('./mysql')

module.exports = {
    createUser: function(username, password, access_level) {
        var query = 'insert into users (username, password, currently_logged_in, access_level) values (?, ?, ?, ?)'
        return new Promise((resolve, reject) => {
            con.query(query, [username, password, 0, access_level], function(err, result) {
                if (err) {
                    reject(err)
                } else {
                    resolve(result)
                }
            })
        })
    }
}