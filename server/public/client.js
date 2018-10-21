console.log('JS');

$(document).ready(onReady);

//onReady listener
function onReady() {
    console.log('JQ');
    getAllTask();
    toggleGreen();
    $('#addTaskBtn').on('click', addTask);
    $('#displayTask').on('click', '.complete-btn', function () {
        $(this).closest('tr').toggleClass('green');
        let taskId = $(this).closest('tr').data('id');
        completeTask(taskId, 'done')
    });
    $('#displayTask').on('click', '.delete-btn', function () {
        console.log(this);
        let taskId = $(this).closest('tr').data('id');
        deleteTask(taskId);
    });
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
        clearInput();
        console.log('task has been added to list', response);
    })
}

//clear inputs
function clearInput() {
    $('#taskIn').val('');
}

//PUT task to completed in database
function completeTask(taskId, trueOrFalse) {
    $.ajax({
        method: 'PUT',
        url: `/weekend_to_do_app/${taskId}`,
        data: {
            trueOrFalse: trueOrFalse
        }
    }).then(function (response) {
        console.log('marking completed task true on database', response);
        getAllTask();
    }).catch(function (error) {
        console.log('error in PUT', error);
    })
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
            <td><button class="complete-btn btn btn-outline-success">Complete</button></td>
            <td><button class="delete-btn btn btn-outline-danger">Delete</button></td>
        </tr>
        `)
        $('#displayTask').append(newRow);
        newRow.data('id', todo.id);
        }
    })
}

//GET if completed, toggle row to be green
function toggleGreen() {
    $.ajax({
        method: 'GET',
        url: '/completed'
    }).then(function(response) {
        console.log('response from completed:', response);
        for(let green of response) {
            console.log(green.completed);
            if (green.completed === true) {
                console.log('turning green');
                $('.complete-btn').toggleClass('green');
            }
            else {
                console.log('not turning green');
            }
        }
    }) //end then
} //end toggleGreen

