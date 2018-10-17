var mysql = require('mysql')

var con = mysql.createConnection({
    host: 'c01.mechanus.io',
    user: 'node',
    password: 'nodepassword',
    database: 'TEQDB'
})

module.exports = {
    con
}