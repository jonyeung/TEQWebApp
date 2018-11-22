const {con} = require('./mysql')
const crypto = require('crypto') 

module.exports = {
    createUser: function(username, password, access_level) {
        var query = 'insert into users (username, password access_level) values (?, ?, ?)'
        const hash = crypto.createHash('sha1')
        hash.update(password)
        const hashedPassword = hash.digest('hex')
        return new Promise((resolve, reject) => {
            con.query(query, [username, hashedPassword, access_level], function(err, result) {
                if (err) {
                    console.log(err)
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
        const query = 'select ID, access_level from users where username = ? and password = ?'
        const hash = crypto.createHash('sha1')
        hash.update(password)
        const hashedPassword = hash.digest('hex')
        return new Promise((resolve, reject) => {
            con.query(query, [username, hashedPassword], function(err, result) {
                if (err) {
		            console.log(err)
                    reject(err)
                } else if (result === undefined || result.length == 0) {
                    resolve({
                        authenticated: false
                    })
                } else {
                    resolve({
                        authenticated: true,
                        user: result[0] // return the first (and the only) user
                    })
                }
            })
        })
    },

    getUsers: function() {
        const query = 'select ID, username, access_level from users'
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
        const query = 'update users set access_level = ? where id = ?'
        return new Promise((resolve, reject) => {
            con.query(query, [access_level, id], function(err, result) {
                console.log(result)
                if(err) {
		            console.log(err)
                    reject(err)
                } else {
                    resolve({
                        id,
                        access_level
                    })
                }
            })
        })
    }

}
