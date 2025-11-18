const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');

// Note: schema requires user_id NOT NULL. For guests we use user_id = 1 by default.
const DEFAULT_USER_ID = process.env.DEFAULT_USER_ID ? parseInt(process.env.DEFAULT_USER_ID, 10) : 1;

// Create booking (POST /api/bookings)
router.post('/', async (req, res) => {
    try {
        const { from_location, to_location, from_date, to_date, travel_type, user_id } = req.body;

        if (!from_location || !to_location || !from_date || !to_date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const bookingData = {
            user_id: user_id ? parseInt(user_id, 10) : DEFAULT_USER_ID,
            from_location,
            to_location,
            travel_type: travel_type || null,
            departure_date: from_date,
            return_date: to_date,
        };

        const created = await Booking.create(bookingData);
        return res.status(201).json(created);
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
});

// List bookings (GET /api/bookings)
router.get('/', async (req, res) => {
    try {
        const rows = await Booking.findAll();
        return res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        return res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
});

// Simple get by id
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) return res.status(404).json({ message: 'Not found' });
        return res.json(booking);
    } catch (error) {
        console.error('Error fetching booking:', error);
        return res.status(500).json({ message: 'Error', error: error.message });
    }
});

// Update booking
router.put('/:id', async (req, res) => {
    try {
        const updated = await Booking.update(req.params.id, req.body);
        return res.json(updated);
    } catch (error) {
        console.error('Error updating booking:', error);
        return res.status(500).json({ message: 'Error', error: error.message });
    }
});

// Delete booking
router.delete('/:id', async (req, res) => {
    try {
        await Booking.delete(req.params.id);
        return res.status(204).send();
    } catch (error) {
        console.error('Error deleting booking:', error);
        return res.status(500).json({ message: 'Error', error: error.message });
    }
});

module.exports = router;