var express = require('express')
var app = express();

app.use(express.urlencoded());

app.get('/', function(req, res) {
    res.json({
        "success": true,
        "msg": "you have successfully connected to this server"
    })

})

app.post('/user', function(req, res) {
    const {username, password, access_level} = req.body
    var user = require('./modules/user')
    user.createUser(username, password, access_level)
        .then((resolve)=>{
            res.json({
                success: true,
                resolve
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