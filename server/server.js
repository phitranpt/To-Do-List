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
    database: 'weekend_to_do_app',
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
app.get('weekend_to_do_app', (req, res) => {
    const sqlText = 'SELECT * FROM weekend_to_do_app ORDER by task';
    pool.query(sqlText)
        .then((result) => {
            console.log('got results from database', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})

//POST route

//DELETE route

//PUT route

//globals
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on port', port);
})