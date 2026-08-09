const searchRoom = require('../../controllers/publicControllers/searchroomController');
const express = require('express');
const route = express.Router();

route.post('/', searchRoom);

module.exports = route;