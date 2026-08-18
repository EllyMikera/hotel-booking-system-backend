const express = require('express')
const route = express.Router()
const singleRoomDetails = require('../../controllers/publicControllers/singleroomdetailsController')

route.get('/', singleRoomDetails)

module.exports = route