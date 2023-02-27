import createNewNote from "./struct.js";
import { createReferenceToStorage, storeTask } from "./storage.js";
import { listTasks} from "./task.js";
import { addNewLabel, cancelNewLabel, showInputToNewLabel } from "./label.js";

const btnAdd = document.querySelector('#add-task');
btnAdd.addEventListener('click', () => {
    const taskInput = document.querySelector('#task-input');
    const task = {
        content: taskInput.value,
        label: '',
        select: false
    }
    
    createNewNote(createReferenceToStorage(task));
    storeTask(task);
    taskInput.value = '';
})

window.addEventListener('load',listTasks)

const plusLabel = document.querySelector('#plus-label');
plusLabel.addEventListener('click', showInputToNewLabel);

const btnNewLabel = document.querySelector('#new-label > img');
btnNewLabel.addEventListener('click', addNewLabel);

const bntCancelNewLabel = document.querySelector('#new-label > button');
bntCancelNewLabel.addEventListener('click', cancelNewLabel);