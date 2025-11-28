const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bookingsRouter = require('./controllers/bookingsController');
const usersRouter = require('./controllers/usersController');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend static files (frontend is two levels up from src)
app.use(express.static(path.join(__dirname, '..', '..', 'frontend')));

// API Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/users', usersRouter);

// Run DB seed initializer (creates users with hashed passwords and sample bookings)
const runSeed = require('./initSeed');
runSeed().catch(err => console.error('Seed init failed:', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});