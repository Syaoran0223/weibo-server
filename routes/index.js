const express = require('express')
const index = express.Router()

const { log } = require('../utils.js')

index.get('/', (req, res) => {
	res.sendfile('./index.html')
})

module.exports = index