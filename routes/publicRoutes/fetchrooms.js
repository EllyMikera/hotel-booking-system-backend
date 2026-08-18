const express = require('express');
const route = express.Router();
const fetchrooms = require('../../controllers/publicControllers/fetcheoomsController')

route.get('/', fetchrooms)

module.exports = route