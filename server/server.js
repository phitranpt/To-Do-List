//requires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const taskRouter = require('./routes/task.router.js');

//uses
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//direct '/task' url request to this file
app.use('/task', taskRouter);

//globals
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('listening on port', port);
})