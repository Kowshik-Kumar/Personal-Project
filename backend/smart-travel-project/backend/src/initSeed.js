const Users = require('./models/usersModel');
const Booking = require('./models/bookingModel');

async function init() {
    try {
        // Check if users exist
        const existing = await Users.findByUsername('arjun_kumar');
        if (existing) {
            console.log('Seed users already exist, skipping seed.');
            return;
        }

        console.log('Creating seed users...');
        const u1 = await Users.create({ username: 'arjun_kumar', email: 'arjun.kumar@example.in', password: 'Password@123' });
        const u2 = await Users.create({ username: 'priya_sharma', email: 'priya.sharma@example.in', password: 'Password@123' });
        const u3 = await Users.create({ username: 'sneha_patel', email: 'sneha.patel@example.in', password: 'Password@123' });

        console.log('Creating seed bookings...');
        await Booking.create({ user_id: u1.id, from_location: 'Mumbai', to_location: 'Delhi', travel_type: 'flight', departure_date: '2025-11-28', return_date: '2025-12-02' });
        await Booking.create({ user_id: u2.id, from_location: 'Bengaluru', to_location: 'Chennai', travel_type: 'train', departure_date: '2025-11-29', return_date: '2025-11-30' });
        await Booking.create({ user_id: u3.id, from_location: 'Kolkata', to_location: 'Hyderabad', travel_type: 'flight', departure_date: '2025-12-05', return_date: '2025-12-10' });

        console.log('Seed complete.');
    } catch (err) {
        console.error('Seed error:', err);
    }
}

module.exports = init;
