const pool = require('../../config/DBconnection')

const fetchrooms = async ( req, res ) => {
    try {
        const [rooms] = await pool.query(
            `SELECT room_id, room_number, room_type, price, description, status
            FROM rooms`
        ) 
        if (rooms.length === 0) {
            console.log('No rooms available at the moment')
            return res.status(404).json({
                message: 'No rooms available at the moment'
            })
        }

        console.log('Available rooms: ', rooms)
        res.status(200).json({
            message: 'Available rooms found',
            data: rooms
        })
    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = fetchrooms
