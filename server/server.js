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

//GET route to display tasks on DOM
app.get('/task', (req, res) => {
    const sqlText = `SELECT * FROM weekend_to_do_app ORDER BY task;`;
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
app.post('/task', (req, res) => {
    const newTask = req.body;
    const sqlText = `INSERT INTO weekend_to_do_app (task) VALUES ($1)`;
    pool.query(sqlText, [newTask.task])
    .then((result) => {
        console.log('added new task to the database', newTask);
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log(`error making database queery ${sqlText}`, error);
        res.sendStatus(500);
    })
})

//DELETE route
app.delete('/weekend_to_do_app/:id', (req, res) => {
    let reqId = req.params.id;
    console.log('delete request for id', reqId);
    let sqlText = 'DELETE FROM weekend_to_do_app WHERE id=$1;';
    pool.query(sqlText, [reqId])
        .then((result) => {
            console.log('task deleted', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in deleting a task from database ${sqlText}`, error);
            res.sendStatus(500);
        })
})

//PUT route
app.put('/weekend_to_do_app/:id', (req, res) => {
    let taskId = req.params.id;
    let trueOrFalse = req.body.trueOrFalse
    let sqlText = '';

    //if user clicks complete btn, mark true on database
    if (trueOrFalse == 'done') {
        sqlText = `UPDATE weekend_to_do_app SET completed=true WHERE id=$1`
    }
    //if user does not click the complete btn, send back bad status and don't run code below
    else {
        res.sendStatus(500);
        return;
    }
    pool.query(sqlText, [taskId])
        .then((result) => {
            console.log('task updated');
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log(`error in updating task from database', ${sqlText}`, error);
            res.sendStatus(500);
        })
})

//globals
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log('listening on port', port);
})