var express = require('express')
var app = express();

app.get('/', function(req, res) {
    res.json({
        "success": true,
        "msg": "you have successfully connected to this server"
    })
})

app.listen(8080)