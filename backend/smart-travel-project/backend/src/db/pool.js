const { Pool } = require('pg');

// Support DATABASE_URL (used by docker-compose) or individual env vars.
// If DATABASE_URL is present, use it; otherwise fall back to discrete env vars.
const connectionString = process.env.DATABASE_URL;

let poolConfig;
if (connectionString) {
    poolConfig = {
        connectionString,
        // For many hosted Postgres providers (and some Docker setups) you don't need SSL locally.
        // If you run in production and need SSL, set PGSSLMODE=require or configure here.
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    };
} else {
    poolConfig = {
        user: process.env.DB_USER || 'user',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'smart_travel',
        password: process.env.DB_PASSWORD || 'password',
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    };
}

const pool = new Pool(poolConfig);

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};