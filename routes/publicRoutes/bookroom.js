const bookRoom = require('../../controllers/publicControllers/bookingController')
const express = require('express')
const route = express.Router()

route.post('/', bookRoom);

module.exports = route;