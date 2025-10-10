const { Pool } = require('pg'); // Import the Pool class from the pg library

// Create a new pool instance with the database connection configuration
const pool = new Pool({
    user: process.env.DB_USER, // Database user from environment variables
    host: process.env.DB_HOST, // Database host from environment variables
    database: process.env.DB_NAME, // Database name from environment variables
    password: process.env.DB_PASSWORD, // Database password from environment variables
    port: process.env.DB_PORT, // Database port from environment variables
});

// Export the pool instance for use in other parts of the application
module.exports = pool;