const {con} = require('./mysql')
const crypto = require('crypto') 

module.exports = {
    createUser: function(username, password, access_level) {
        var query = 'insert into users (username, password, currently_logged_in, access_level) values (?, ?, ?, ?)'
        const hash = crypto.createHash('sha1')
        hash.update(password)
        const hashedPassword = hash.digest('hex')
        return new Promise((resolve, reject) => {
            con.query(query, [username, hashedPassword, 0, access_level], function(err, result) {
                console.log(result)
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        id: result.insertId
                    })
                }
            })
        })
    },

    authenticateUser: function(username, password) {
        const query = 'select ID, currently_logged_in, access_level from users where username = ? and password = ?'
        const hash = crypto.createHash('sha1')
        hash.update(password)
        const hashedPassword = hash.digest('hex')
        return new Promise((resolve, reject) => {
            con.query(query, [username, hashedPassword], function(err, result) {
                if (err) {
                    reject(err)
                } else if (result === undefined || result.length == 0) {
                    resolve({
                        authenticated: false
                    })
                } else {
                    resolve({
                        authenticated: true,
                        user: result[0]
                    })
                }
            })
        })
    },

    getUsers: function() {
        const query = 'select ID, username, currently_logged_in, access_level from users'
        return new Promise((resolve, reject) => {
            con.query(query, function(err, result) {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve({
                        users: result
                    })
                }
            })
        })
    },

    changeUserAccessLevel: function(access_level, id) {
        const query = 'update users set access_level = ? where id = id'
        return new Promise((resolve, reject) => {
            con.query(query, [access_level, username], function(err, result) {
                console.log(result)
                if(err) {
                    reject(err)
                } else {
                    resolve({
                        id:result.insertID
                    })
                }
            })
        })
    }

}