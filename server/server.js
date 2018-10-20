//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

//globals
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on port', port);
})

//GET ROUTE

//POST ROUTE

//PUT ROUTE

//DELETE ROUTE