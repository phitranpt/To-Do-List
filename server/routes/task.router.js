const express = require('express');
const router = express.Router();
const pool = require('../modules/database-pool.js');

//GET ROUTE
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM task;`;
    pool.query(sqlText)
        .then((result) => {
            console.log('got tasks back from the database', result);
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(`error in making database query ${sqlText}`, error);
            res.sendStatus(500);
        }) 
})

//POST ROUTE

//DELETE ROUTE

//POST ROUTE

module.exports = router;