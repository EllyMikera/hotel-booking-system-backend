const pool = require('../../config/DBconnection');

const bookRoom = async (req, res) => {
    const {room_id, full_name, identification_number, phone_number, email, checkin_date, checkout_date} = req.body
    try {
        if(!room_id || !full_name || !identification_number || !phone_number || !email ||!checkin_date ||!checkout_date) {
            console.log('Input fields cannot be empty')
            return res.status(400).json({
                message: 'Input fields cannot be empty'
            })
        }

        const today = new Date()
        today.setHours(0,0,0,0)

        const checkin = new Date(checkin_date)
        checkin.setHours(0,0,0,0)

        if(checkin < today) {
            console.log('Checkin date cannot be in the past')
            return res.status(400).json({
                message: 'Checkin date cannot be in the past'
            })
        }

        if(new Date(checkin_date) >= new Date(checkout_date)) {
            console.log('Checkin date must be before checkout date')
            return res.status(400).json({
                message: 'Checkin date must be before checkout date'
            })
        }

        const [room] = await pool.query(
            'SELECT * FROM rooms WHERE room_id = ? AND status = "available"',
            [room_id]
        )

        if (room.length === 0) {
            console.log('Room is not available. Please choose a different room or check the room status.')
            return res.status(400).json({
                message: 'Room is not available. Please choose a different room or check the room status.'
            })
        }

        const [existingReservations] = await pool.query(
            `SELECT id FROM reservation
            WHERE room_id = ?
            AND
            checkin_date < ?
            AND
            checkout_date > ?`,
            [room_id, checkout_date, checkin_date]
        )

        if(existingReservations.length > 0) {
            console.log('Room is already reserved for these dates. Try choosing a different room or enter different checkin and checkout dates')
            return res.status(400).json({
                message: 'Room is already reserved for these dates. Try choosing a different room or enter different checkin and checkout dates'
            })
        }

        const [existingGuest] = await pool.query(
            'SELECT guest_id FROM guests WHERE email = ?',
            [email]
        )

        let guestid;
        if(existingGuest.length === 0) {
            const [results] = await pool.query(
                'INSERT INTO guests(full_name, identification_number, phone_number, email) VALUES(?, ?, ?, ?)',
                [full_name, identification_number, phone_number, email]
            )

            guestid = results.insertId
        } else {
            guestid = existingGuest[0].guest_id
        }

        let reservationid;
        const [reservationsData] = await pool.query(
            'INSERT INTO reservation(room_id, guest_id, checkin_date, checkout_date) VALUES(?, ?, ?, ?)',
            [room_id, guestid, checkin_date, checkout_date]
        )
        reservationid = reservationsData.insertId
        console.log(reservationid)

        await pool.query(
            'UPDATE rooms SET status = "booked" WHERE room_id = ?',
            [room_id]
        ) 

        await pool.query(
            'UPDATE reservation SET status = "confirmed" WHERE id = ?',
            [reservationid]
        )

        console.log('Room booked successfully');
        return res.status(200).json({
            message: 'Room booked successfully'
        })


    } catch (error) {
        console.log(error?.message)
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports =  bookRoom

/*
1. Receive request
2. Validate input
3. Validate checkin and checkout dates
4. Check if room exists/usable
5. Check reservation overlap
6. Find or create guest record
7. Create reservation record
8. Set reservation status to confirmed
9. Update room status to booked
10. Return success message and reservation details
*/