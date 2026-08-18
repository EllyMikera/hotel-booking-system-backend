const pool = require('../../config/DBconnection');

const searchRoom = async (req, res) => {
    const {check_in_date, check_out_date, room_type} = req.body
    try {
        if(!check_in_date || !check_out_date || !room_type) {
            console.log("Missing required fields");
            return res.status(400).json({
                message: "Missing required fields"
            });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const checkin = new Date(check_in_date);
        checkin.setHours(0, 0, 0, 0);

        if(checkin < today) {
            console.log("Check-in date cannot be in the past");
            return res.status(400).json({
                message: "Check-in date cannot be in the past"
            });
        }

        if(new Date(check_in_date) >= new Date(check_out_date)) {
            console.log("Check-in date must be before check-out date");
            return res.status(400).json({
                message: "Check-in date must be before check-out date"
            });
        }

        const [availableRooms] = await pool.query(
            `SELECT room_number, room_type, price, description, status 
            FROM rooms 
            WHERE room_type = ? 
            AND status = "available" 
            AND room_id NOT IN (
                SELECT room_id 
                FROM reservations
                WHERE 
                    check_in_date < ?
                    AND
                    check_out_date > ?
            )`,
            [room_type, check_out_date, check_in_date]
        )

        if(availableRooms.length === 0) {
            console.log('Try a different room type or checkin and checkout dates and we will show you what we have')
            return res.status(404).json({
                message: 'Try a different room type or checkin and checkout dates and we will show you what we have'
            })
        }

        console.log('Available rooms:', availableRooms);
        return res.status(200).json({
            message: 'Available rooms found',
            data: availableRooms
        })

    } catch (error) {
        console.log(error?.message);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = searchRoom

/*

*/