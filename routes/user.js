const express = require('express')
const user = express.Router()
const User = require('../model/user')
const { log } = require('../utils.js')
const { currentUser } = require('./main')
user.get('/', async(req, res) => {
	let u = await User.currentUser(req)
	log( '/ u', u)
	res.sendfile('./index.html')
})

// 注册
user.post('/register', async(req, res) => {
	let form = req.body
    const u = await User.register(form) || {
        code: 1,
        status: '注册失败',
    }
    log('u', u)
    res.send(u)
})
// 登录
user.post('/login', async(req, res)=> {
	let form = req.body
	const u = await User.validateAuth(form)
	if (u != false) {
		req.session.uid = u.id
		log('是否储存', req.session)
		res.send(req.session)
	} else {
		res.send('登录失败')
	}
})

user.post('/isLogin', async(req, res) => {
	log('测试 session', req.session)
	let user = await User.currentUser(req)
	let form = req.body
	log('测试 user', user)
	res.send(user)
})

module.exports = user