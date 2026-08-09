const bcrpt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const pool = require('../../config/DBconnection')

dotenv.config();

const Register = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        if(!username || !email || !password) {
            console.log('Input fields cannot be empty')
            return res.status(400).json({
                message: 'Input fields cannot be empty. Please enter your username, email and password'
            })
        }

        const [existingUser] = await pool.query(
            'SELECT id, username, email FROM users WHERE username = ? OR email = ?',
            [username, email]
        )

        if (existingUser.length > 0) {
            console.log('Account already exists')
            return res.status(409).json({
                message: 'Account exists. Try logging in.'
            })
        }

        const hashedPassword = await bcrpt.hash(password, 10)
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        )
        return res.status(201).json({
            message: 'Account created successfully'
        })

    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = Register;