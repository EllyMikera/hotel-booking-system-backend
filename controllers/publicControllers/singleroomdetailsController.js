const pool = require('../../config/DBconnection');

const singleRoomDetails = async ( req, res ) => {
    const {room_id} = req.body;
    try {
        if ( !room_id ) {
            console.log('You have not chosen a room')
            return res.status(400).json({
                message: 'You have not chosen a room'
            })
        }
        const [roomDetails] = await pool.query(
            'SELECT room_number, room_type, price, description, status FROM rooms WHERE room_id = ?',
            [room_id]
        )
        if (roomDetails.length === 0) {
            console.log('There is no room of that id')
            return res.status(404).json({
                message: 'There is no room of that id'
            })
        }
        console.log('Room found: ', roomDetails)
        res.status(200).json({
            message: 'Room found',
            data: roomDetails
        })
    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports = singleRoomDetails