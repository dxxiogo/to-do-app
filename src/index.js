import createNewNote from "./struct.js";
import { storeTask } from "./storage.js";
import { listTasks, showInputNewLabel } from "./task.js";

const btnAdd = document.querySelector('#add-task');
btnAdd.addEventListener('click', () => {
    const taskInput = document.querySelector('#task-input');
    const task = {
        content: taskInput.value,
        label: '',
        select: false
    }
    if(localStorage.getItem('amount-tasks')){
        let amountTasks = Number(JSON.parse(localStorage.getItem('amount-tasks')));
        amountTasks ++;
        task.reference = `task-${amountTasks}`;
        localStorage.setItem('amount-tasks', JSON.stringify(amountTasks));
    } else {
        let amountTasks = 1;
        task.reference = `task-${amountTasks}`;
        localStorage.setItem('amount-tasks', JSON.stringify(amountTasks));
    }
    createNewNote(task);
    storeTask(task);
    taskInput.value = '';
})

window.addEventListener('load',listTasks)

const plusLabel = document.querySelector('#plus-label');
plusLabel.addEventListener('click', showInputNewLabel);