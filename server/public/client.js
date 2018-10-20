console.log('JS');

$(document).ready(onReady);

//onReady listener
function onReady() {
    console.log('JQ');
    $('#addTaskBtn').on('click', addTask);
    getAllTask();
    $('#displayTask').on('click', '.delete-btn', function () {
        console.log(this);
        let taskId = $(this).closest('tr').data('id');
        deleteTask(taskId);
    } );
}

//POST tasks to database
function addTask() {
    console.log('addTaskBtn works!');
    let taskIn = $('#taskIn').val();
    console.log('new task being add:', taskIn);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: {
            task: taskIn
        }
    }).then(function(response) {
        getAllTask();
        clearInputs();
        console.log('task has been added to list', response);
    })
}

//clear inputs
function clearInput() {
    $('#taskIn').val('');
}

//DELETE task from DOM and database
function deleteTask(taskId) {
    $.ajax({
        method: 'DELETE',
        url: `/weekend_to_do_app/${taskId}`
    }).then(function (response) {
        console.log('deleting task', response);
        getAllTask();
    }).catch(function (error) {
        console.log('error in deleting', error);
    })
}

//GET tasks from database and append to DOM
function getAllTask() {
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then(function(response) {
        console.log('response:', response);
        $('#displayTask').empty();
        for (let todo of response) {
        let newRow = $(`
        <tr>
            <td>${todo.task}</td>
            <td><button class="complete-btn">Complete</button></td>
            <td><button class="delete-btn">Delete</button></td>
        </tr>
        `)
        $('#displayTask').append(newRow);
        newRow.data('id', todo.id);
        }
    })
}