const Register = require('../../controllers/adminControllers/registerController')
const express = require('express')
const route = express.Router()

route.post('/', Register)

module.exports = route