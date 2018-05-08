const express = require('express')
const app = express.Router()
const { log } = require('../utils.js')


app.get('/', (req, res) => {
    res.send('1111111')
})

app.post('/login', (req, res)=> {
    let form = req.body
    log('login', form)
})