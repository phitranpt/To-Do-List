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

//get all tasks and display on DOM
function getAllTask() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(function(response) {
        console.log('response:', response);
    })
}