//database
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'bookstore',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('connected to the database');
});

pool.on('error', (error) => {
    console.log('error with the database pool', error);
});

module.exports = pool;