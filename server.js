const express = require('express')
const dotenv = require('dotenv')
const loginUser = require('./routes/adminRoutes/login')
const registerUser = require('./routes/adminRoutes/register')
const searchRoom = require('./routes/publicRoutes/searchroom')
const bookRoom = require('./routes/publicRoutes/bookroom')

dotenv.config()
const PORT = process.env.PORT
const server = express();

server.use(express.json())

server.use('/login', loginUser)
server.use('/register', registerUser)
server.use('/searchroom', searchRoom)
server.use('/bookroom', bookRoom)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})