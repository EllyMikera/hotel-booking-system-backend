const express = require('express')
const Login = require('../../controllers/adminControllers/loginController')
const route = express.Router()

route.post('/', Login);

module.exports = route