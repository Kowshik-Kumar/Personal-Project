const express = require('express');
const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const router = express.Router();

// Simple JSON file persistence (backend/data/bookings.json)
const dataDir = path.join(__dirname, '..', '..', 'data');
const dbFile = path.join(dataDir, 'bookings.json');

async function ensureDataFile() {
    try {
        await fs.promises.mkdir(dataDir, { recursive: true });
        try {
            await fs.promises.access(dbFile);
        } catch (e) {
            await fs.promises.writeFile(dbFile, JSON.stringify([]), 'utf8');
        }
    } catch (err) {
        console.error('Error ensuring data file:', err);
        throw err;
    }
}

async function readBookings() {
    await ensureDataFile();
    const raw = await fs.promises.readFile(dbFile, 'utf8');
    try {
        return JSON.parse(raw || '[]');
    } catch (e) {
        return [];
    }
}

async function writeBookings(bookings) {
    await ensureDataFile();
    await fs.promises.writeFile(dbFile, JSON.stringify(bookings, null, 2), 'utf8');
}

// Create booking (POST /api/bookings)
router.post('/', async (req, res) => {
    try {
        const { from_location, to_location, from_date, to_date, travel_type } = req.body;

        if (!from_location || !to_location || !from_date || !to_date) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const bookings = await readBookings();
        const newBooking = {
            id: randomUUID(),
            from_location,
            to_location,
            from_date,
            to_date,
            travel_type: travel_type || null,
            created_at: new Date().toISOString()
        };

        bookings.push(newBooking);
        await writeBookings(bookings);

        return res.status(201).json(newBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ message: 'Error creating booking' });
    }
});

// List bookings (GET /api/bookings)
router.get('/', async (req, res) => {
    try {
        const bookings = await readBookings();
        return res.status(200).json(bookings.reverse()); // latest first
    } catch (error) {
        console.error('Error reading bookings:', error);
        return res.status(500).json({ message: 'Error reading bookings' });
    }
});

module.exports = router;