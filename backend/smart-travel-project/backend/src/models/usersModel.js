const db = require('../db/pool');
const bcrypt = require('bcryptjs');

const UsersModel = {
    async create({ username, email, password }) {
        // hash password
        const hashed = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at`;
        const params = [username, email || null, hashed];
        const result = await db.query(sql, params);
        return result.rows[0];
    },

    async findByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = $1';
        const result = await db.query(sql, [username]);
        return result.rows[0] || null;
    },

    async findById(id) {
        const sql = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
        const result = await db.query(sql, [id]);
        return result.rows[0] || null;
    },

    async verifyPassword(username, password) {
        const user = await this.findByUsername(username);
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;
        // return safe user
        return { id: user.id, username: user.username, email: user.email };
    }
};

module.exports = UsersModel;
