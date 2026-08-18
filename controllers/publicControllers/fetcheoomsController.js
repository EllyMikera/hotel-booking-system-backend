const pool = require('../../config/DBconnection')

const fetchrooms = async ( req, res ) => {
    const [rooms] = await pool.query(
        `SELECT room_id, room_number, room_type, price, description, status
        FROM rooms`
    )

    if (rooms.length === 0) {
        console.log('No rooms Available at the moment')
        return res.status(404).json({
            message: 'No rooms available at the moment'
        })
    }

    console.log('Available rooms: ', rooms)
    res.status(200).json({
        message: 'Available rooms found',
        data: rooms
    })
}

module.exports = fetchrooms
