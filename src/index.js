import createNewNote from "./struct.js";

const btnAdd = document.querySelector('#add-task');
btnAdd.addEventListener('click', () => {
    const taskInput = document.querySelector('#task-input');
    const task = {
        content: taskInput.value,
        label: '',
        select: false
    }
    createNewNote(task);
    taskInput.value = '';
})

