console.log('JS');

$(document).ready(onReady);

//onReady listener
function onReady() {
    console.log('JQ');
    $('#addTaskBtn').on('click', addTask);
    getAllTask();
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
            <td>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </td>
        </tr>
        `)
        $('#displayTask').append(newRow);
        newRow.data('id', todo.id);
        }
    })
}