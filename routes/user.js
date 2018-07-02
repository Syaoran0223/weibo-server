const express = require('express')
const user = express.Router()
const User = require('../model/user')
const { log } = require('../utils.js')
const { currentUser } = require('./main')
const jwt = require('jwt-simple')
const secret = 'fengTest'
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
		let token = jwt.encode(u.id, secret)
		res.setHeader('Jwt', token)
		// res.header('Jrrwt', token)
		res.setHeader("Access-Control-Expose-Headers", "Authorization, token")
		log('token', token)
		log('res', res.Jwt)
		// res.writeHead({'Jwt': token});
		let data = {'data': token}
		res.send(data)
	} else {
		res.send('登录失败')
	}
})

user.post('/isLogin', async(req, res) => {
	// log('测试 session', req.session)
	log('req', req.headers['jwt'])
	let decoded = jwt.decode(req.headers['jwt'], secret)
	log('decoded', decoded)
	let user = await User.currentUser(decoded)
	let form = req.body
	log('测试 user', user)
	res.send(user)
})

module.exports = user