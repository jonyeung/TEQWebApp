const express = require('express')
const app = express();
const user = require('./modules/user')

app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.json({
        "success": true,
        "msg": "you have successfully connected to this server"
    })

})

app.post('/user', function(req, res) {
    const {username, password, access_level} = req.body
    user.createUser(username, password, access_level)
        .then((result)=>{
            res.json({
                success: true,
                result
            })
        })
        .catch((error) => {
            res.json({
                success: false,
                error
            })
        })
})

app.get('/authenticate', function(req, res) {
    const {username, password} = req.query
    user.authenticateUser(username, password)
        .then((result) => {
            res.json({
                success: true,
                result
            })
        })
        .catch((error) => {
            res.json({
                success: false,
                error
            })
        })
})

app.get('/user', function(req, res) {
    user.getUsers()
        .then((result) => {
            res.json({
                success: true,
                result
            })
        })
        .catch((error) => {
            res.json({
                success: false,
                error
            })
        })
})

app.listen(8080)
