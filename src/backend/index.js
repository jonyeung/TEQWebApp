const express = require('express')
const app = express();
const cors = require("cors")

const user = require('./modules/user')
const agency = require('./modules/agency')

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

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

app.post('/changeAccess', function(req,res) {
    const {access_level, id} = req.query
    user.changeUserAccessLevel(access_level, id)
        .then((result) =>{
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

app.post('/insertRow', function(req, res) {
    const {row} = req.body;
    agency.insertRow(row)
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

app.get('/getColumns', function(req, res) {
    const {columns} = req.query;
    agency.retrieveData(columns)
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

app.post('/saveQuery', function(req, res) {
    const {query_name, column_list} = req.body
    agency.saveQuery(query_name, column_list)
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

app.get('/getPresetQueries', function(req, res) {
    agency.getPresetQueries()
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
