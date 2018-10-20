//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//database
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool ({
    database: 'weekend_to_do_list',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 300000
})

pool.on('connect', () => {
    console.log('connected to database');
})

pool.on('error', (error) => {
    console.log('error connecting to database', error);
});

//GET route

//POST route

//DELETE route

//PUT route

//globals
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on port', port);
})