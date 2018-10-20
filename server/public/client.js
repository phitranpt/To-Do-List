console.log('JS');

$(document).ready(onReady);

//onReady listener
function onReady() {
    console.log('JQ');
    $('#addTaskBtn').on('click', addTask);
    getAllTask();
}

//takes in users inputs and adds tasks
function addTask() {
    console.log('addTaskBtn works!');
}

