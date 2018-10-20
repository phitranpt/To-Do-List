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