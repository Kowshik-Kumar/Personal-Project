const db = require('../db/pool');

class Booking {
    constructor(id, userId, tripId, bookingDate, status) {
        this.id = id;
        this.userId = userId;
        this.tripId = tripId;
        this.bookingDate = bookingDate;
        this.status = status;
    }

    static async create(userId, tripId, bookingDate) {
        const result = await db.query(
            'INSERT INTO bookings (user_id, trip_id, booking_date, status) VALUES ($1, $2, $3, $4) RETURNING *',
            [userId, tripId, bookingDate, 'confirmed']
        );
        return new Booking(result.rows[0].id, userId, tripId, bookingDate, result.rows[0].status);
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM bookings WHERE id = $1', [id]);
        if (result.rows.length) {
            const { user_id, trip_id, booking_date, status } = result.rows[0];
            return new Booking(id, user_id, trip_id, booking_date, status);
        }
        return null;
    }

    static async update(id, updates) {
        const { userId, tripId, bookingDate, status } = updates;
        const result = await db.query(
            'UPDATE bookings SET user_id = $1, trip_id = $2, booking_date = $3, status = $4 WHERE id = $5 RETURNING *',
            [userId, tripId, bookingDate, status, id]
        );
        return new Booking(result.rows[0].id, userId, tripId, bookingDate, result.rows[0].status);
    }

    static async delete(id) {
        await db.query('DELETE FROM bookings WHERE id = $1', [id]);
    }

    static async findAll() {
        const result = await db.query('SELECT * FROM bookings');
        return result.rows.map(row => new Booking(row.id, row.user_id, row.trip_id, row.booking_date, row.status));
    }
}

module.exports = Booking;