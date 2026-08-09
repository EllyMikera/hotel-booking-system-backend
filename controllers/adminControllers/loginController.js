const pool = require('../../config/DBconnection')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')

dotenv.config();

const Login = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            console.log('Input fields cannot be empty')
            return res.status(400).json({
                message: 'Input fields cannot be empty. Please enter both your email and password'
            })
        }

        const [user] = await pool.query(
            'SELECT id, username, email, password FROM users WHERE email = ?',
            [email]
        )

        if(user.length === 0) {
            console.log('This account does not exist. Please create an account to access this service')
            return res.status(404).json({
                message: 'This account does not exist. Please create an account to access this service'
            })
        }

        const isValid = await bcrypt.compare(password, user[0].password)
        if(!isValid) {
            console.log('Invalid email or password. Try again')
            return res.status(400).json({
                message: 'Invalid email or password. Please try again'
            })
        }

        const token = jwt.sign(
            {
                id: user[0].id,
                username: user[0].username,
                email: user[0].email
            }, process.env.SECRET_KEY,
            {
                expiresIn: process.env.JWT_EXPIRY
            }
        )

        console.log('Login successful. Welcome')
        res.status(200).json({
            token,
            message: 'Login successful. Welcome'
        })

    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = Login