const express = require('express')
const user = express.Router()

const { log } = require('../utils.js')

user.get('/', (req, res) => {
    res.sendfile('./index.html')
})

// 注册
user.post('/register', async(req, res) => {
    let form = req.body
    const u = await  User.register(form) || {
        code: 1,
        status: '注册失败',
    }
    log('u', u)
    res.send(u)
})
// 登录
user.post('/login', async(req, res)=> {
    let form = req.body
    log('login form', form)
    res.send('success')
})

module.exports = user